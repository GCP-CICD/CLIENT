import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export function formatUtc(utcTime: string, format: string = TIME_FORMAT) {
  return dayjs.utc(utcTime).utcOffset(8).format(format);
}
