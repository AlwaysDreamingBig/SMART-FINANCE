import { add } from "date-fns";

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const thirtyDaysFromNow = (): Date =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const fortyFiveMinutesFromNow = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now;
};
export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);

export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

export const anHourFromNow = (): Date => new Date(Date.now() + 60 * 60 * 1000);

export function convertToMilliseconds(duration: string): number {
  // Match the number and the unit (m = minutes, h = hours, d = days)
  const match = duration.match(/^(\d+)([mhd])$/);
  if (!match) {
    throw new Error("Invalid duration format. Use '15m', '1h', or '2d'.");
  }

  const [, value, unit] = match;
  let milliseconds = 0;

  // Convert the duration to milliseconds based on the unit
  switch (unit) {
    case "m": // minutes
      milliseconds = parseInt(value) * 60 * 1000;
      break;
    case "h": // hours
      milliseconds = parseInt(value) * 60 * 60 * 1000;
      break;
    case "d": // days
      milliseconds = parseInt(value) * 24 * 60 * 60 * 1000;
      break;
    default:
      throw new Error("Invalid unit for duration. Use 'm', 'h', or 'd'.");
  }

  return milliseconds;
}
