import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '../Icons';
import { DYNAMIC_COLORS } from '../../constants/colors';

interface PDFPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
    filename: string;
    description?: string;
    category?: string;
    type?: 'paper' | 'slides';
}

/**
 * PDFPreviewModal Component
 * 
 * Modal for previewing PDF documents with download option.
 * Uses createPortal to render above all other elements.
 */
export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
    isOpen,
    onClose,
    pdfUrl,
    title,
    filename,
    description,
    category,
    type = 'paper'
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const typeColor = type === 'paper' ? DYNAMIC_COLORS.raw.light.primary : '#8b5cf6';

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 animate-fadeIn">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleBackdropClick}></div>
            <div className="bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--card-border)] w-full max-w-7xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-slide-up">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors border border-white/10"
                >
                    <Icons.X className="w-6 h-6" />
                </button>

                {/* PDF Viewer - Left side */}
                <div className="w-full md:w-2/3 h-[50vh] md:h-auto bg-[var(--bg-secondary)] relative flex flex-col">
                    <div className="flex-grow relative overflow-hidden">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)] z-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${typeColor} transparent ${typeColor} ${typeColor}` }}></div>
                                    <p className="text-[var(--text-secondary)] text-sm">Loading PDF...</p>
                                </div>
                            </div>
                        )}
                        <iframe
                            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                            className="w-full h-full"
                            title={title}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </div>

                {/* Metadata - Right side */}
                <div className="w-full md:w-1/3 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col bg-[var(--card-bg)]">
                    <div className="mb-6">
                        <span className="font-bold uppercase tracking-widest text-xs mb-2 block" style={{ color: typeColor }}>
                            {type === 'paper' ? 'Research Paper' : 'Presentation'}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-tight">
                            {title}
                        </h2>
                        {category && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span
                                    className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                                    style={{
                                        backgroundColor: `${typeColor}15`,
                                        color: typeColor,
                                        borderColor: `${typeColor}33`
                                    }}
                                >
                                    {category}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6 flex-grow">
                        {description && (
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                                    <Icons.FileText className="w-5 h-5" style={{ color: typeColor }} />
                                    Overview
                                </h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Download button */}
                    <div className="pt-6 border-t border-[var(--card-border)] mt-6">
                        <button
                            onClick={handleDownload}
                            className="w-full px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${typeColor} 0%, ${DYNAMIC_COLORS.raw.light.primary} 100%)`,
                                color: 'white'
                            }}
                        >
                            <Icons.Download className="w-5 h-5" />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
