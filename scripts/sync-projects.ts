import fs from "fs";
import path from "path";

export interface PhotographyProject {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images: { src: string; alt: string }[];
}

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const PHOTOGRAPHY_DIR = path.join(PUBLIC_DIR, "Projects", "Photography");
const OUTPUT_FILE = path.resolve(process.cwd(), "src", "data", "photography-projects.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

// Preferred display order for existing collections (any new folders will be appended automatically)
const PREFERRED_ORDER = [
  "taj resort and spa gandhinagar",
  "arcedior",
  "wedding",
  "suryam repose",
  "desert beats",
  "product photography",
  "gumnaam rahee",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-");
}

function getAllImages(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue; // Ignore hidden files like .DS_Store
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllImages(fullPath));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      const relPath = path.relative(PUBLIC_DIR, fullPath);
      results.push("/" + relPath.replace(/\\/g, "/"));
    }
  }
  return results;
}

function chooseThumbnail(images: string[]): string {
  if (images.length === 0) return "/placeholder.svg";

  // Check for priority thumbnail names: exterior, cover, banner, thumbnail, 1., (1)
  const priorityPatterns = [
    /exterior/i,
    /cover/i,
    /banner/i,
    /thumbnail/i,
    /(?:^|[_\s-])0*1\./i,
    /\(1\)\./i,
    /_00\./i,
  ];

  for (const pattern of priorityPatterns) {
    const match = images.find((img) => pattern.test(path.basename(img)));
    if (match) return match;
  }

  return images[0];
}

export function syncPhotographyProjects(): PhotographyProject[] {
  if (!fs.existsSync(PHOTOGRAPHY_DIR)) {
    console.warn(`Photography directory not found at: ${PHOTOGRAPHY_DIR}`);
    return [];
  }

  const entries = fs.readdirSync(PHOTOGRAPHY_DIR, { withFileTypes: true });
  const folderNames = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name);

  // Sort folders based on preferred order or alphabetical
  folderNames.sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    const indexA = PREFERRED_ORDER.indexOf(aLower);
    const indexB = PREFERRED_ORDER.indexOf(bLower);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const projects: PhotographyProject[] = [];

  for (const folder of folderNames) {
    const folderPath = path.join(PHOTOGRAPHY_DIR, folder);
    const images = getAllImages(folderPath);

    if (images.length === 0) continue;

    // Natural sort images so 1, 2, 10 or (1), (2), (10) sort correctly
    images.sort((a, b) => collator.compare(path.basename(a), path.basename(b)));

    // Check if an optional info.json exists for custom title/overrides
    const infoFile = path.join(folderPath, "info.json");
    let customMeta: Partial<PhotographyProject> = {};
    if (fs.existsSync(infoFile)) {
      try {
        customMeta = JSON.parse(fs.readFileSync(infoFile, "utf-8"));
      } catch (err) {
        console.warn(`Could not parse info.json in ${folder}`);
      }
    }

    const title = customMeta.title || folder;
    const thumbnail = customMeta.thumbnail || chooseThumbnail(images);

    projects.push({
      id: customMeta.id || slugify(folder),
      title,
      category: customMeta.category || "Photography",
      thumbnail,
      images: images.map((src) => ({
        src,
        alt: title,
      })),
    });
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2), "utf-8");
  console.log(`✓ Synced ${projects.length} photography projects (${projects.reduce((acc, p) => acc + p.images.length, 0)} images) to ${path.relative(process.cwd(), OUTPUT_FILE)}`);

  return projects;
}

// Run immediately
syncPhotographyProjects();

// Watch mode if `--watch` is passed
if (process.argv.includes("--watch")) {
  console.log(`👀 Watching ${PHOTOGRAPHY_DIR} for image and folder changes...`);
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  fs.watch(PHOTOGRAPHY_DIR, { recursive: true }, () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      console.log("Change detected in Photography folder. Re-syncing...");
      syncPhotographyProjects();
    }, 300);
  });
}
