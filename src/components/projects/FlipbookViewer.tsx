"use client";

import { useState, useRef, useEffect, forwardRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface FlipbookViewerProps {
    pdfUrl: string;
    title?: string;
}

// Forward ref for pages to work with react-pageflip
const FlipPage = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <div ref={ref} className="bg-white shadow-lg overflow-hidden h-full">
            {props.children}
        </div>
    );
});

FlipPage.displayName = 'FlipPage';

const FlipbookViewer = ({ pdfUrl, title }: FlipbookViewerProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [pageWidth, setPageWidth] = useState(400); // Default, will verify on load
    const [pageHeight, setPageHeight] = useState(600);
    const flipBookRef = useRef<any>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    const handleNext = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    const handlePrev = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipPrev();
        }
    };

    // Calculate responsive dimensions
    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = window.innerWidth > 768 ? 800 : window.innerWidth - 40;
            const calculatedWidth = Math.floor(containerWidth / 2);
            // Example aspect ratio (A4ish)
            const calculatedHeight = Math.floor(calculatedWidth * 1.414);

            setPageWidth(calculatedWidth);
            setPageHeight(calculatedHeight);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div className="flex flex-col items-center w-full py-8 bg-gray-50 rounded-lg">
            {title && <h3 className="text-xl font-semibold mb-6">{title}</h3>}

            <div className="relative w-full flex justify-center items-center min-h-[400px]">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex justify-center"
                    loading={<div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-md" />}
                    error={<div className="text-red-500">Failed to load PDF. Please check the file path.</div>}
                >
                    {/* 
               We render pages only *after* we know numPages, but react-pageflip needs children immediately.
               However, FlipBook component itself cannot be rendered empty in some versions.
               We render it only when numPages > 0 
            */}
                    {numPages > 0 && (
                        <HTMLFlipBook
                            width={pageWidth}
                            height={pageHeight}
                            size="fixed"
                            minWidth={300}
                            maxWidth={1000}
                            minHeight={400}
                            maxHeight={1533}
                            maxShadowOpacity={0.5}
                            showCover={true}
                            mobileScrollSupport={true}
                            ref={flipBookRef}
                            className="shadow-2xl"
                            style={{ margin: "0 auto" }}
                            startPage={0}
                            drawShadow={true}
                            flippingTime={1000}
                            usePortrait={true}
                            startZIndex={0}
                            autoSize={true}
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <FlipPage key={`page_${index + 1}`} number={index + 1}>
                                    <Page
                                        pageNumber={index + 1}
                                        width={pageWidth}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        loading={<div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Loading Page...</div>}
                                    />
                                </FlipPage>
                            ))}
                        </HTMLFlipBook>
                    )}
                </Document>
            </div>

            <div className="flex gap-4 mt-6">
                <Button onClick={handlePrev} variant="outline" size="sm">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <div className="text-sm text-muted-foreground flex items-center">
                    Flip via click or drag
                </div>
                <Button onClick={handleNext} variant="outline" size="sm">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default FlipbookViewer;
