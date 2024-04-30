import { parseISO, differenceInSeconds } from "date-fns";

export const getDateTimeDifferenceInSeconds = (start_date: string) => {
  try {
    const backendStartDate = parseISO(start_date);
    const currentDate = new Date();

    const timeDifferenceInSeconds = differenceInSeconds(currentDate, backendStartDate);

    return timeDifferenceInSeconds < 0 ? 0 : timeDifferenceInSeconds;
  } catch (error) {
    console.error("Error parsing or calculating time difference:", error);
    return 0;
  }
};

export const isExpiredTime = (start_date: string, expiration_time: number) => {
  const timeInSeconds = getDateTimeDifferenceInSeconds(start_date);

  return timeInSeconds > expiration_time;
};
