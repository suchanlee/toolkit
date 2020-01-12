export function formatDate(date: Date) {
  if (isDateToday(date)) {
    const hour = date.getHours();
    const isPm = hour >= 12;
    return `${isPm ? hour - 12 : hour}:${`${date.getMinutes()}`.padStart(2, "0")} ${
      isPm ? "PM" : "AM"
    }`;
  } else if (isDateYesterday(date)) {
    return "Yesterday";
  } else {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }
}

export function isDateToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}

export function isDateYesterday(date: Date) {
  const today = new Date();
  const yesterdayDate = new Date(today.getTime() - DAY_IN_MILLIS);
  return date.toDateString() === yesterdayDate.toDateString();
}

export const DAY_IN_MILLIS = 60 * 60 * 24 * 1000;
