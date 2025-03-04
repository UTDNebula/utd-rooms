// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Rooms } from '@/types/Rooms';

type Data = {
  message: string;
  data?: Rooms;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const API_KEY = process.env.REACT_APP_NEBULA_API_KEY;
  if (typeof API_KEY !== 'string') {
    res.status(500).json({ message: 'API key is undefined' });
    return;
  }
  const headers = {
    'x-api-key': API_KEY,
    Accept: 'application/json',
  };

  return new Promise<void>((resolve) => {
    fetch('https://api.utdnebula.com/rooms', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== 'success') {
          throw new Error(data.message);
        }
        // Convert from array to object
        const roomsMap: Rooms = {};
        for (const building of data.data) {
          roomsMap[building.building] = building.rooms;
        }
        res.status(200).json({
          message: 'success',
          data: roomsMap,
        });
        resolve();
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
        resolve();
      });
  });
}
