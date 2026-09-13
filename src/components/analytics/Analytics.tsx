'use client';

import React from 'react';
import Script from 'next/script';

/**
 * Lightweight Google Analytics 4 Script Loader
 * Set NEXT_PUBLIC_GA_ID in your Netlify environment variables or .env.local
 * e.g. G-XXXXXXXXXX
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // If no GA ID is configured, fail gracefully without impacting site performance
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
