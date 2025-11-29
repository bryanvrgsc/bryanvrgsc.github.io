import React, { useState, useEffect } from 'react';

/**
 * Typewriter - Animated typewriter effect component
 * 
 * Features:
 * - Character-by-character animation
 * - Customizable delay and cursor
 * - Callback on completion
 * - Can be activated/deactivated
 */

export interface TypewriterProps {
    text: string;
    delay?: number;
    startDelay?: number;
    cursorColor?: string;
    onComplete?: () => void;
    active?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    delay = 25,
    startDelay = 0,
    cursorColor = "bg-emerald-500",
    onComplete,
    active = true
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!active) return;

        const startTimeout = setTimeout(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, delay);
                return () => clearTimeout(timeout);
            } else if (onComplete && currentIndex === text.length) {
                onComplete();
            }
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [currentIndex, text, delay, startDelay, onComplete, active]);

    return (
        <span className="inline-flex items-center">
            {displayedText}
            {currentIndex < text.length && (
                <span className={`inline-block w-0.5 h-5 ml-0.5 ${cursorColor} animate-pulse`} />
            )}
        </span>
    );
};
