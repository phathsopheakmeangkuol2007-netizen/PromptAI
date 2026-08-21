import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  isDarkBg?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  iconSize = 34, 
  showText = true,
  isDarkBg = false 
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* 3D Green graduation cap icon matching the uploaded logo */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform group-hover:scale-105 duration-200"
      >
        {/* Crown / Base Underneath */}
        <path
          d="M 32 49 V 60 C 32 72 68 72 68 60 V 49 C 63 54 57 56.5 50 56.5 C 43 56.5 37 54 32 49 Z"
          fill="#059669"
        />
        {/* Isometric Diamond Cap Top */}
        <path
          d="M 50 18 C 51.5 18 53.2 18.5 54.8 19.3 L 85.5 34.8 C 88.5 36.3 88.5 39.7 85.5 41.2 L 54.8 56.7 C 51.8 58.2 48.2 58.2 45.2 56.7 L 14.5 41.2 C 11.5 39.7 11.5 36.3 14.5 34.8 L 45.2 19.3 C 46.8 18.5 48.5 18 50 18 Z"
          fill="#059669"
        />
        {/* Tassel Knot at Center Top */}
        <circle cx="50" cy="36.5" r="3" fill="#059669" />
        {/* Tassel Cord hanging to left side */}
        <path
          d="M 50 36.5 C 35 36.5 22 41 22 48 V 60"
          stroke="#059669"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Tassel Ring & Bulb */}
        <path
          d="M 22 62 C 18 66 18 73 22 76 C 26 73 26 66 22 62 Z"
          fill="#059669"
        />
        <circle cx="22" cy="61" r="3" fill="#059669" />
      </svg>

      {showText && (
        <span className={`text-2xl font-black tracking-tight flex items-center ${isDarkBg ? 'text-white' : 'text-slate-900'} transition-colors duration-200`}>
          Prompt<span className="text-emerald-600">AI</span>
        </span>
      )}
    </div>
  );
};

