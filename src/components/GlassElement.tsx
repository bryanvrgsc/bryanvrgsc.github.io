import React, { CSSProperties, ReactNode } from "react";

type GlassElementProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  height?: number;
  width?: number;
  radius?: number;
  blur?: number;
};

export const GlassElement = ({
  children,
  className = "",
  style = {},
  height,
  width,
  radius,
  blur = 16,
}: GlassElementProps) => {
  
  // Construct dynamic styles based on sizing props
  const dynamicStyle: CSSProperties = {
    ...style,
    ...(width ? { width: `${width}px` } : {}),
    ...(height ? { height: `${height}px` } : {}),
    ...(radius ? { borderRadius: `${radius}px` } : {}),
    '--glass-blur': `${blur}px`,
  } as CSSProperties;

  return (
    <div className={`glass-element-box ${className}`} style={dynamicStyle}>
      <div className="glass-element-shine" />
      {children}
    </div>
  );
};