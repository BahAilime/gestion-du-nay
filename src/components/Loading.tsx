import React from 'react';
import { RotatingLines } from 'react-loader-spinner'

export default function Loading({
  color = "#e8a07c",
  text = null,
  className = ""
}: {
  color?: string;
  noText?: boolean;
  text?: string|null;
  className?: string;
}) {
    return (
        <div className={`flex flex-row items-center justify-center gap-3 ${className}`}>
            <RotatingLines
                visible={true}
                width="30"
                strokeColor={color}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
            {text && <p>{text}</p>}
        </div>
    );
}
