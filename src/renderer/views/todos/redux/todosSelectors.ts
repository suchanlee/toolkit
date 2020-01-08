import { createSelector } from "reselect";
import { RootState } from "../../../states/rootState";
import { createTodayTodoDate, isTodoDatesEqual } from "../utils/todoDateUtils";
import { PersistedTodos } from "./todosTypes";

export const selectTodos = (state: RootState) => state.todos;
export const selectTodosDays = (state: RootState) => state.todos.todosDays;
export const selectTodosGroups = (state: RootState) => state.todos.groups;
export const selectTodosActiveDate = (state: RootState) => state.todos.activeDate;

export const selectActiveTodosDay = createSelector(
  selectTodosDays,
  selectTodosActiveDate,
  (days, activeDate) => {
    if (activeDate == null) {
      return undefined;
    }

    return days.find(day => isTodoDatesEqual(day.date, activeDate));
  }
);

export const selectTodosToday = createSelector(selectTodosDays, days => {
  const todayDate = createTodayTodoDate();
  const lastDay = days[0];

  if (lastDay != null && isTodoDatesEqual(lastDay.date, todayDate)) {
    return lastDay;
  } else {
    return undefined;
  }
});

export const selectTodosPersist = createSelector(
  selectTodosDays,
  selectTodosGroups,
  (days, groups): PersistedTodos => ({ todosDays: days, groups: groups })
);

export const selectTodosHasToday = createSelector(selectTodosDays, days => {
  const todayDate = createTodayTodoDate();
  const lastDay = days[0];
  return lastDay != null && isTodoDatesEqual(todayDate, lastDay.date);
});
