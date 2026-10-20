import os
import sys
from concurrent.futures import ProcessPoolExecutor, as_completed
from PIL import Image, ImageOps

# Supported image formats
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

def convert_image_to_webp(input_path, output_path, max_dim=1920, quality=80):
    """
    Converts and optimizes an image to WebP format while preserving core visual quality.
    - Preserves EXIF orientation (prevents rotated portrait shots)
    - Resizes high-resolution images down to max_dim (preserving aspect ratio) with high-quality Lanczos resampling
    - Handles alpha/transparency safely
    - Compresses with WebP method=6 at quality=80 for optimal clarity and small file size
    """
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with Image.open(input_path) as img:
            # 1. Correct orientation according to EXIF data
            img = ImageOps.exif_transpose(img)

            # 2. Handle color modes
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img = img.convert("RGBA")
            elif img.mode != "RGB":
                img = img.convert("RGB")

            # 3. High quality downscale if larger than max_dim (preserving aspect ratio)
            width, height = img.size
            if max(width, height) > max_dim:
                scale_ratio = max_dim / max(width, height)
                new_size = (int(round(width * scale_ratio)), int(round(height * scale_ratio)))
                img = img.resize(new_size, Image.Resampling.LANCZOS)

            # 4. Save as WebP
            img.save(output_path, format="WEBP", quality=quality, method=6)

        input_size_kb = os.path.getsize(input_path) / 1024
        output_size_kb = os.path.getsize(output_path) / 1024
        return (True, input_path, output_path, input_size_kb, output_size_kb, None)
    except Exception as e:
        return (False, input_path, output_path, 0, 0, str(e))

def process_all_photography_folders(base_dir=None, max_dim=1920, quality=80):
    """
    Finds all photography project folders, creates <Folder>-webp directories,
    and converts all images preserving subfolder structures.
    """
    if base_dir is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))

    # Identify main photography directories (skip hidden and already created -webp folders)
    main_folders = [
        d for d in os.listdir(base_dir)
        if os.path.isdir(os.path.join(base_dir, d))
        and not d.startswith(".")
        and not d.endswith("-webp")
    ]

    tasks = []
    for main_folder in sorted(main_folders):
        main_folder_path = os.path.join(base_dir, main_folder)
        output_main_folder = f"{main_folder}-webp"
        output_main_path = os.path.join(base_dir, output_main_folder)

        for root, _, files in os.walk(main_folder_path):
            rel_root = os.path.relpath(root, main_folder_path)
            target_dir = output_main_path if rel_root == "." else os.path.join(output_main_path, rel_root)

            for filename in files:
                stem, ext = os.path.splitext(filename)
                if ext.lower() in SUPPORTED_EXTENSIONS:
                    in_path = os.path.join(root, filename)
                    out_path = os.path.join(target_dir, f"{stem}.webp")
                    tasks.append((in_path, out_path))

    total_tasks = len(tasks)
    print(f"Found {len(main_folders)} main folders with {total_tasks} images to process.")
    print(f"Settings: Max dimension = {max_dim}px, WebP Quality = {quality}%, Preserving EXIF orientation.")
    print("-" * 70)

    success_count = 0
    fail_count = 0
    total_orig_kb = 0
    total_opt_kb = 0

    cpu_count = min(os.cpu_count() or 4, 8)
    with ProcessPoolExecutor(max_workers=cpu_count) as executor:
        futures = {
            executor.submit(convert_image_to_webp, in_p, out_p, max_dim, quality): (in_p, out_p)
            for in_p, out_p in tasks
        }

        for idx, future in enumerate(as_completed(futures), 1):
            success, in_p, out_p, in_kb, out_kb, err = future.result()
            rel_in = os.path.relpath(in_p, base_dir)
            rel_out = os.path.relpath(out_p, base_dir)
            if success:
                success_count += 1
                total_orig_kb += in_kb
                total_opt_kb += out_kb
                savings = (1 - (out_kb / in_kb)) * 100 if in_kb > 0 else 0
                print(f"[{idx}/{total_tasks}] {rel_in} -> {rel_out} | {in_kb:.0f}KB -> {out_kb:.0f}KB ({savings:+.1f}%)")
            else:
                fail_count += 1
                print(f"[{idx}/{total_tasks}] FAILED: {rel_in} - Error: {err}")

    print("=" * 70)
    print(f"Processing complete!")
    print(f"Total processed: {total_tasks} (Success: {success_count}, Failed: {fail_count})")
    print(f"Original total size: {total_orig_kb / 1024:.2f} MB")
    print(f"Compressed total size: {total_opt_kb / 1024:.2f} MB")
    if total_orig_kb > 0:
        overall_reduction = (1 - (total_opt_kb / total_orig_kb)) * 100
        print(f"Overall storage reduction: {overall_reduction:.1f}%")

if __name__ == "__main__":
    process_all_photography_folders(max_dim=1920, quality=80)
