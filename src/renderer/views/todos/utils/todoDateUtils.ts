import { TodoDate } from "../redux/todosTypes";

export function todoDateToStr(date: TodoDate): string {
  return `${date.year}-${`${date.month}`.padStart(2, "0")}-${`${date.day}`.padStart(2, "0")}`;
}

export function todoDateToNumber(date: TodoDate): number {
  return parseInt(
    `${date.year}${`${date.month}`.padStart(2, "0")}${`${date.day}`.padStart(2, "0")}`,
    10
  );
}

export function createTodayTodoDate(): TodoDate {
  const date = new Date();
  return createTodoDate(date);
}

export function createTodoDate(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}

export function isTodoDatesEqual(d1: TodoDate, d2: TodoDate) {
  return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
}
