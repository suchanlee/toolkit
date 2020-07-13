import { Notification } from "electron";

const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
const MORNING_NOTIFICATION_HOUR = 8; // 9am, 0-indexed

function getNextDate(): Date {
  let next = new Date();
  // get tomorrow if MORNING_NOTIFICATION_TIME already passed
  if (next.getHours() >= MORNING_NOTIFICATION_HOUR) {
    next = new Date(next.getTime() + DAY_IN_MILLIS);
  }
  next.setHours(MORNING_NOTIFICATION_HOUR);
  next.setMinutes(0);
  next.setSeconds(0);
  next.setMilliseconds(0);

  return next;
}

export function registerMorningNotification() {
  const notification = new Notification({
    title: "Good Morning from Toolkit 🎉",
    body: "Make sure to fill out your todos before you start your day."
  });

  function scheduleJob() {
    const next = getNextDate();
    setTimeout(() => {
      notification.show();
      scheduleJob();
    }, next.getTime() - Date.now());
  }

  scheduleJob();
}
