import dayjs, { type Dayjs } from 'dayjs';

export const defaultStartTime = '09:00';
export const defaultEndTime = '09:00';

const minTime = 6;
const maxTime = 23;

export default function snapTime(time: Dayjs): Dayjs {
  if (time.isBefore(dayjs().hour(minTime).minute(0))) {
    return dayjs().hour(minTime).minute(0);
  }
  if (time.isAfter(dayjs().hour(maxTime).minute(0))) {
    return dayjs().hour(maxTime).minute(0);
  }
  return time;
}
