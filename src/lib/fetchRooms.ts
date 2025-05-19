import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

export default async function fetchRooms(): Promise<GenericFetchedData<Rooms>> {
  const API_KEY = process.env.REACT_APP_NEBULA_API_KEY;
  if (typeof API_KEY !== 'string') {
    return { message: 'error', data: 'API key is undefined' };
  }

  try {
    const res = await fetch('https://api.utdnebula.com/rooms', {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        Accept: 'application/json',
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    if (data.message !== 'success') {
      throw new Error(data.message);
    }

    // Convert from array to object
    const roomsMap: Rooms = {};
    for (const building of data.data) {
      roomsMap[building.building] = {
        lat: building.lat === 0 ? null : building.lat,
        lng: building.lng === 0 ? null : building.lng,
        rooms: building.rooms,
      };
    }

    return { message: 'success', data: roomsMap };
  } catch (error) {
    return {
      message: 'error',
      data:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
