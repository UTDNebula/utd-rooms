import type { Metadata } from 'next';
import React from 'react';

import fetchRooms from '@/lib/fetchRooms';

import Home from './Home';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://rooms.utdnebula.com',
  },
};

/**
 * Returns the home page with Nebula Branding and search options
 */
export default async function Page() {
  const rooms = await fetchRooms();
  return (
    <Home
      roomsLoading={false}
      rooms={rooms.message === 'success' ? rooms.data : {}}
    />
  );
}
