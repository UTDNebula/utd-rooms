export type Rooms = {
  [key: string]: {
    room: string;
    capacity: number | null;
  }[];
};
