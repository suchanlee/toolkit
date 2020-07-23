import { createSelector } from "reselect";
import { RootState } from "../../../states/rootState";
import { getSundayDate, isDateToday } from "../../../utils/dateUtils";
import {
  createTodayTodoDate,
  isTodoDatesEqual,
  todoDateStrToTodoDate,
  todoDateToDate,
  todoDateToStr
} from "../utils/todoDateUtils";
import { PersistedTodos } from "./todosTypes";

export const selectTodos = (state: RootState) => state.todos;
export const selectTodosDays = (state: RootState) => state.todos.days;
export const selectTodosDateStrs = (state: RootState) => state.todos.dateStrs;
export const selectTodosGroups = (state: RootState) => state.todos.groups;
export const selectTodosActiveDate = (state: RootState) => state.todos.activeDate;

export const selectTodosDaysAsArray = createSelector(
  selectTodosDays,
  selectTodosDateStrs,
  (days, dateStrs) => {
    const daysArray = [];
    for (const dateStr of dateStrs) {
      const day = days[dateStr];
      if (day != null) {
        daysArray.push(day);
      }
    }
    return daysArray;
  }
);

export const selectActiveTodosDay = createSelector(
  selectTodosDays,
  selectTodosActiveDate,
  (days, activeDate) => {
    if (activeDate == null) {
      return undefined;
    }

    return days[todoDateToStr(activeDate)];
  }
);

export const selectTodosHasActive = createSelector(selectTodosActiveDate, active => active != null);

export const selectTodosLatestDay = createSelector(
  selectTodosDateStrs,
  selectTodosDays,
  (dateStrs, days) => {
    const latestDateStr = dateStrs[0];
    if (latestDateStr == null) {
      return undefined;
    }

    return days[latestDateStr];
  }
);

export const selectTodosToday = createSelector(selectTodosLatestDay, latestDay => {
  const todayDate = createTodayTodoDate();
  if (latestDay != null && isTodoDatesEqual(latestDay.date, todayDate)) {
    return latestDay;
  } else {
    return undefined;
  }
});

export const selectTodosPersist = createSelector(
  selectTodosDaysAsArray,
  selectTodosGroups,
  (days, groups): PersistedTodos => ({ todosDays: days, groups: groups })
);

export const selectTodosHasToday = createSelector(selectTodosDateStrs, dateStrs => {
  const todayDate = createTodayTodoDate();
  const lastDateStr = dateStrs[0];
  return lastDateStr != null && isTodoDatesEqual(todayDate, todoDateStrToTodoDate(lastDateStr));
});

export const selectTodosSundaysByTodoDateStr = createSelector(selectTodosDaysAsArray, days => {
  const sundaysByDayDateStr = new Map<string, Date>();
  let currentSunday: Date | undefined;

  for (const day of days) {
    const date = todoDateToDate(day.date);

    if (currentSunday == null || date.getTime() < currentSunday.getTime()) {
      const sunday = getSundayDate(date);
      currentSunday = sunday;
      sundaysByDayDateStr.set(todoDateToStr(day.date), sunday);
    }
  }

  return sundaysByDayDateStr;
});

export const selectTodosIsReadonly = createSelector(
  selectTodosActiveDate,
  activeDate => activeDate == null || !isDateToday(todoDateToDate(activeDate))
);
