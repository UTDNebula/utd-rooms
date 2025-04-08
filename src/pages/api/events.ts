// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Hierarchy } from '@/types/Events';

type Data = {
  message: string;
  data?: Hierarchy<unknown>;
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
  const route = req.query.route;
  const date = req.query.date;
  if (typeof route !== 'string' || typeof date !== 'string') {
    res.status(400).json({ message: 'Incorrect query present' });
    return;
  }
  const headers = {
    'x-api-key': API_KEY,
    Accept: 'application/json',
  };
  const url = new URL(route + '/' + date, 'https://api.utdnebula.com/');

  return new Promise<void>((resolve) => {
    fetch(url.href, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== 'success') {
          if (data.error === 'mongo: no documents in result') {
            res.status(200).json({
              message: 'success',
              data: {},
            });
            resolve();
          }
          throw new Error(data.error ?? data.message);
        }
        // Convert from array to object
        const eventsMap: Hierarchy<unknown> = {};
        for (const building of data.data.buildings) {
          eventsMap[building.building] = {};
          for (const room of building.rooms) {
            eventsMap[building.building][room.room] = room.events;
          }
        }
        res.status(200).json({
          message: 'success',
          data: eventsMap,
        });
        resolve();
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
        resolve();
      });
  });
}
