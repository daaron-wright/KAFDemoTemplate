import React from 'react';
import Image from 'next/image';

interface ConcatenatedLogoProps {
  flexDirection?: 'row' | 'column';
  width?: number;
  height?: number;
  className?: string;
  customSrc?: string;
}

export function ConcatenatedLogo({ width = 400, height = 80, className = "", flexDirection = 'column', customSrc }: ConcatenatedLogoProps) {
  if (customSrc) {
    return (
      <div
        className={`${className} concatenated-logo__wrapper flex items-center justify-center`}
        style={{ width: width, height: height }}
      >
        <Image
          src={customSrc}
          alt="Custom Logo"
          width={width}
          height={height}
          className="object-contain max-h-full max-w-full"
          priority
          style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${className} concatenated-logo__wrapper flex items-center gap-4`}
      style={{ width: width, height: height, flexDirection: flexDirection }}
    >
      {/* L&G Logo - Original (now first) */}
      <div className="flex-shrink-0">
        <Image
          src="/images/octapharma-blue-logo.svg"
          alt="Octapharma logo"
          width={Math.floor(width * 0.4)}
          height={height}
          className="object-contain"
          priority
          style={{width: 'auto'}}
        />
      </div>
      
      {/* Kyndryl Logo - Original (now second) */}
      <div className="flex-shrink-0">
        <Image
          src="/images/kyndryl-logo.svg"
          alt="Kyndryl"
          width={Math.floor(width * 0.5)}
          height={height}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export default ConcatenatedLogo;
