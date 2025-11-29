import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Icons } from '../Icons';

// @ts-ignore - Vite will handle this import
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

/**
 * PDFViewer Component
 * 
 * Renders PDF files with navigation controls.
 * Features loading states, error handling, and page navigation.
 * Uses PDF.js library for rendering.
 * 
 * @param url - URL of the PDF file to display
 */
export const PDFViewer = ({ url }: { url: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pdfDoc, setPdfDoc] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Load PDF document
    useEffect(() => {
        const loadPDF = async () => {
            try {
                setLoading(true);
                setError(false);
                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;
                setPdfDoc(pdf);
                setTotalPages(pdf.numPages);
                setLoading(false);
            } catch (err) {
                console.error('Error loading PDF:', err);
                setError(true);
                setLoading(false);
            }
        };

        loadPDF();
    }, [url]);

    // Render current page
    useEffect(() => {
        if (!pdfDoc || !canvasRef.current) return;

        const renderPage = async () => {
            try {
                const page = await pdfDoc.getPage(currentPage);
                const canvas = canvasRef.current!;
                const context = canvas.getContext('2d')!;

                // Calculate scale to fit container
                const container = canvas.parentElement!;
                const containerWidth = container.clientWidth;
                const viewport = page.getViewport({ scale: 1 });
                const scale = containerWidth / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: scaledViewport,
                };

                await page.render(renderContext).promise;
            } catch (err) {
                console.error('Error rendering page:', err);
            }
        };

        renderPage();
    }, [pdfDoc, currentPage]);

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-[var(--text-secondary)]">Cargando presentación...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                <div className="text-center p-4">
                    <p className="text-[var(--text-secondary)] mb-4">No se pudo cargar el PDF</p>
                    <a href={url} target="_blank" rel="noreferrer" className="text-emerald-500 font-bold hover:underline">
                        Descargar PDF
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex flex-col">
            {/* PDF Canvas */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                <canvas ref={canvasRef} className="max-w-full h-auto shadow-lg" />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 p-4 bg-slate-200 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                    <Icons.ArrowUp className="w-4 h-4 rotate-[-90deg]" />
                    Anterior
                </button>

                <div className="px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                    <span className="font-mono text-sm">
                        <span className="font-bold text-[var(--text-primary)]">{currentPage}</span>
                        <span className="text-[var(--text-secondary)]"> / </span>
                        <span className="text-[var(--text-secondary)]">{totalPages}</span>
                    </span>
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                    Siguiente
                    <Icons.ArrowUp className="w-4 h-4 rotate-90" />
                </button>
            </div>
        </div>
    );
};
