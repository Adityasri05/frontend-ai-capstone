import React from 'react';

/**
 * Official FlyRank AI Internship Verified Credential Component
 * Credential ID: FR-D1-T668H-R789R
 * Verification URL: https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=Aditya
 */
export default function FlyRankCredential() {
  return (
    <a
      href="https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=Aditya"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Verify Aditya Srivastav's FlyRank AI Internship credential FR-D1-T668H-R789R (opens in a new tab)"
      className="inline-flex items-center gap-3.5 p-3.5 sm:px-4 sm:py-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 max-w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
    >
      {/* Official FlyRank Logo Emblem */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className="flex-shrink-0"
      >
        <rect width="96" height="96" rx="22" fill="#051F21" />
        <path
          d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6026 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
          fill="#54E399"
        />
      </svg>

      {/* Credential Details */}
      <span className="flex flex-col text-left min-w-0">
        <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#051F21]/60">
          FlyRank AI Internship
        </span>
        <span className="text-[14px] sm:text-[15px] font-semibold text-[#051F21] tracking-tight leading-tight truncate">
          Verified credential
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] text-[#1A7A4A] font-medium tracking-tight">
          FR-D1-T668H-R789R
        </span>
      </span>

      {/* Verification Pill */}
      <span className="ml-auto sm:ml-2 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#54E399]/15 border border-[#54E399]/30 rounded-full text-xs font-semibold text-[#1A7A4A] flex items-center gap-1.5 flex-shrink-0 group-hover:bg-[#54E399]/25 transition-colors">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          className="flex-shrink-0"
        >
          <circle cx="12" cy="12" r="10" stroke="#1A7A4A" strokeWidth="1.5" />
          <path
            d="M7.9 12.3l2.8 2.8 5.4-5.8"
            stroke="#1A7A4A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Verify</span>
      </span>
    </a>
  );
}
