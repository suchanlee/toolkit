import { TodoDate } from "../redux/todosTypes";

export function todoDateToStr(todoDate: TodoDate): string {
  return `${todoDate.year}/${todoDate.month}/${todoDate.day}`;
}

export function todoDateToNumber(date: TodoDate): number {
  return parseInt(
    `${date.year}${`${date.month}`.padStart(2, "0")}${`${date.day}`.padStart(2, "0")}`,
    10
  );
}

export function todoDateToDate(todoDate: TodoDate): Date {
  return new Date(todoDate.year, todoDate.month - 1, todoDate.day);
}

export function todoDateStrToTodoDate(todoDateStr: string): TodoDate {
  const [year, month, day] = todoDateStr.split("/");
  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    day: parseInt(day, 10)
  };
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
