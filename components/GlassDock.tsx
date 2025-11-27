import React, { useRef, useState, useLayoutEffect } from 'react';
import { GlassElement } from '../GlassElement/GlassElement';

export const GlassDock = ({ children }: { children?: React.ReactNode }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const hiddenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!hiddenRef.current) return;

    // Compatibility check for older browsers (e.g., iOS < 13.4)
    if (typeof ResizeObserver === 'undefined') {
        // Fallback: Set size once and don't observe changes
        setSize({
            width: hiddenRef.current.offsetWidth,
            height: hiddenRef.current.offsetHeight
        });
        return;
    }

    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
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