export type Hierarchy<T> = {
  [key: string]: {
    [key: string]: T[];
  };
};

export type CourseBookEvent = {
  section: string;
  start_time: string;
  end_time: string;
};
