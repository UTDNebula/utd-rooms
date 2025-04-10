import type { Hierarchy } from '@/types/Events';

type Data<T> = {
  message: string;
  data?: Hierarchy<T>;
};

export default async function fetchEvents<T>(
  route: string,
  date: string,
): Promise<Data<T>> {
  const API_KEY = process.env.REACT_APP_NEBULA_API_KEY;
  if (typeof API_KEY !== 'string') {
    return { message: 'API key is undefined' };
  }

  try {
    const url = new URL(route + '/' + date, 'https://api.utdnebula.com/');
    const res = await fetch(url.href, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (data.message !== 'success') {
      if (data.error === 'mongo: no documents in result') {
        return { message: 'success', data: {} };
      }
      throw new Error(data.error ?? data.message);
    }

    // Convert from array to object
    const eventsMap: Hierarchy<T> = {};
    for (const building of data.data.buildings) {
      eventsMap[building.building] = {};
      for (const room of building.rooms) {
        eventsMap[building.building][room.room] = room.events;
      }
    }

    return { message: 'success', data: eventsMap };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
