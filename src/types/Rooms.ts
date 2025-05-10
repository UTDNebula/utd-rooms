export type Rooms = {
  [key: string]: {
    lat: number | null;
    lng: number | null;
    rooms: {
      room: string;
      capacity: number;
    }[];
  };
};
