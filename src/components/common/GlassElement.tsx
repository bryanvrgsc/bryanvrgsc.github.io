import React, { useState, useRef, useLayoutEffect } from 'react';

/**
 * GlassElement - A glass morphism container component
 * 
 * Features:
 * - Customizable size and border radius
 * - Backdrop blur effect
 * - Shine effect on hover
 * - Flexible styling
 */

export interface GlassElementProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    height?: number;
    width?: number;
    radius?: number;
    blur?: number;
}

export const GlassElement: React.FC<GlassElementProps> = ({
    children,
    className = "",
    style = {},
    height,
    width,
    radius,
    blur = 16,
}) => {
    // Construct dynamic styles based on sizing props
    const dynamicStyle: React.CSSProperties = {
        ...style,
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {}),
        ...(radius ? { borderRadius: `${radius}px` } : {}),
        '--glass-blur': `${blur}px`,
    } as React.CSSProperties;

    return (
        <div className={`glass-element-box ${className}`} style={dynamicStyle}>
            <div className="glass-element-shine" />
            {children}
        </div>
    );
};

/**
 * GlassDock Component
 * 
 * A self-sizing glass morphism dock that wraps its children.
 * Uses ResizeObserver to dynamically calculate size based on content.
 * Provides a pill-shaped container with glass morphism effects.
 */
export const GlassDock = ({ children }: { children?: React.ReactNode }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const hiddenRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!hiddenRef.current) return;

        // Compatibility check for older browsers (e.g., iOS < 13.4)
        if (typeof ResizeObserver === 'undefined') {
            // Fallback: Set size once and don't observe changes
            if (hiddenRef.current) {
                setSize({
                    width: hiddenRef.current.offsetWidth,
                    height: hiddenRef.current.offsetHeight
                });
            }
            return;
        }

        const obs = new ResizeObserver((entries) => {
            for (const _ of entries) {
                if (hiddenRef.current) {
                    setSize({
                        width: hiddenRef.current.offsetWidth,
                        height: hiddenRef.current.offsetHeight
                    });
                }
            }
        });
        obs.observe(hiddenRef.current);
        return () => obs.disconnect();
    }, [children]);

    return (
        <div className="relative flex justify-center items-end pb-2">
            {/* Hidden Layout for Sizing: Renders children invisibly to calculate natural width */}
            <div
                ref={hiddenRef}
                className="absolute bottom-2 opacity-0 pointer-events-none flex items-center gap-2 md:gap-3 p-1.5 md:p-2 whitespace-nowrap"
                aria-hidden="true"
                style={{ visibility: 'hidden' }}
            >
                {children}
            </div>

            {/* Actual Visible Glass Element */}
            <div className={`transition-opacity duration-500 ${size.width > 0 ? 'opacity-100' : 'opacity-0'}`}>
                <GlassElement
                    width={size.width}
                    height={size.height}
                    radius={size.height / 2}
                    className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2"
                >
                    {children}
                </GlassElement>
            </div>
        </div>
    );
};
