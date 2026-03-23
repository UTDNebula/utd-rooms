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

export type AstraEvent = {
  activity_name: string;
  meeting_type: string;
  start_date: string;
  end_date: string;
  current_state: string;
  not_allowed_usage_mask: number;
  usage_color: string;
  capacity: number;
};

export type MazevoEvent = {
  eventName: string;
  organizationName: string;
  contactName: string;
  setupMinutes: number;
  dateTimeStart: string;
  dateTimeEnd: string;
  teardownMinutes: number;
  statusDescription: string;
  statusColor: string;
};

export type CometCalendarEvent = {
  summary: string;
  location: string;
  start_time: string;
  end_time: string;
  description: string;
  event_type: string[];
  target_audience: string[];
  topic: string[];
  event_tags: string[];
  event_website: string;
  department: string[];
  contact_name: string;
  contact_email: string;
  contact_phone_number: string;
}