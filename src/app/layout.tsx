import '@/styles/globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import React from 'react';

import ClientLocalizationProvider from '@/lib/localization';
import SyncfusionWrapper from '@/lib/syncfusion';
import theme from '@/lib/theme';

export const metadata: Metadata = {
  metadataBase: new URL('https://rooms.utdnebula.com'),
  title: 'UTD ROOMS',
  description: 'Find open rooms at UT Dallas.',
  openGraph: {
    title: 'UTD ROOMS',
    description: 'Find open rooms at UT Dallas.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
};

export const viewport = {
  //copied from globals.css
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#573dff' },
    { media: '(prefers-color-scheme: dark)', color: '#a297fd' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
        <GoogleAnalytics gaId="G-BKZ9JMC28B" />
      )}
      <body className="bg-white dark:bg-black font-inter text-haiti dark:text-white">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ClientLocalizationProvider>
              <SyncfusionWrapper>{children}</SyncfusionWrapper>
            </ClientLocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
