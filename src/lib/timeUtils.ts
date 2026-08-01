import { type Dayjs } from 'dayjs';

export const defaultStartTime = 9;
export const defaultEndTime = 22;

const minTime = 6;
const maxTime = 23;

export function snapTime(time: null): null;
export function snapTime(time: Dayjs): Dayjs;
export function snapTime(time: Dayjs | null): Dayjs | null;
export function snapTime(time: Dayjs | null): Dayjs | null {
  if (time == null) {
    return null;
  }
  if (time.isBefore(time.hour(minTime).minute(0))) {
    return time.hour(minTime).minute(0);
  }
  if (time.isAfter(time.hour(maxTime).minute(0))) {
    return time.hour(maxTime).minute(0);
  }
  return time;
}

export function validTime(time: Dayjs | null): Dayjs | null {
  return time == null || !time.isValid() ? null : time;
}
