/**
 * PDF Utilities
 * 
 * Helper functions for handling PDF documents in the digital library.
 */

/**
 * Download a PDF file
 * @param url - URL of the PDF file
 * @param filename - Desired filename for download
 */
export function downloadPDF(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Open PDF in new tab
 * @param url - URL of the PDF file
 */
export function openPDFInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Format file size from bytes
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
