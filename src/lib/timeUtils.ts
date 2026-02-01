import dayjs, { type Dayjs } from 'dayjs';

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
  if (time.isBefore(dayjs().hour(minTime).minute(0))) {
    return dayjs().hour(minTime).minute(0);
  }
  if (time.isAfter(dayjs().hour(maxTime).minute(0))) {
    return dayjs().hour(maxTime).minute(0);
  }
  return time;
}

export function validTime(time: Dayjs | null): Dayjs | null {
  console.log(time?.isValid(), time == null || !time.isValid() ? null : time);
  return time == null || !time.isValid() ? null : time;
}
