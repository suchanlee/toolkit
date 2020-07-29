import { keyBy, noop } from "lodash-es";
import * as React from "react";
import { defaultMemoize } from "reselect";
import { createKNL } from "../../../shared-components/KeyNavList";
import { Todo, TodoGroup, TodosDay } from "../redux/todosTypes";
import { TodoGroupsButton } from "./TodoGroupsButton";
import { TodoItem } from "./TodoItem";

require("./TodosList.scss");

const KNL = createKNL<Todo>();

const MISC_GROUP: TodoGroup = {
  name: "Miscellaneous",
  id: "☃"
};

export namespace TodosList {
  export interface Props {
    listId: string;
    isReadonly: boolean;
    day: TodosDay;
    groups: readonly TodoGroup[];
    setEscapeKeyCloseDisabled(isDisabled: boolean): void;
  }
}

export class TodosList extends React.PureComponent<TodosList.Props> {
  public render() {
    const groupOrderedTodos = this.getGroupOrderedTodos(this.props.day.todos, this.props.groups);
    return (
      <div className="todos-list">
        <KNL
          className="todos-list-nav-list"
          id={this.props.listId}
          items={groupOrderedTodos}
          isDisabled={this.props.isReadonly}
          onItemSelect={noop}
          getItemKey={getItemKey}
          renderItem={this.renderItem}
        />
        {!this.props.isReadonly && (
          <TodoGroupsButton setEscapeKeyCloseDisabled={this.props.setEscapeKeyCloseDisabled} />
        )}
      </div>
    );
  }

  private renderItem = (todo: Todo, index: number, listId: string) => {
    const groupedTodos = this.getGroupedTodos(this.props.day.todos, this.props.groups);
    const todoElement = (
      <TodoItem
        todo={todo}
        date={this.props.day.date}
        isReadonly={this.props.isReadonly}
        listId={listId}
        rowIndex={index}
      />
    );

    const groupId = todo.groupId ?? MISC_GROUP.id;
    if (this.hasGroupedTodos(groupedTodos) && groupedTodos[groupId][0].id === todo.id) {
      const groupsById = this.getGroupsById(this.props.groups);
      return (
        <React.Fragment>
          <div className="todos-list-group">{groupsById[groupId]?.name}</div>
          {todoElement}
        </React.Fragment>
      );
    }
    return todoElement;
  };

  private getGroupedTodos = defaultMemoize(
    (todos: readonly Todo[], groups: readonly TodoGroup[]) => {
      const groupIds = new Set(groups.map(group => group.id));
      const groupedTodos: Record<string, Todo[]> = {};
      for (const todo of todos) {
        if (todo.groupId != null && groupIds.has(todo.groupId)) {
          if (groupedTodos[todo.groupId] == null) {
            groupedTodos[todo.groupId] = [];
          }
          groupedTodos[todo.groupId].push(todo);
        } else {
          if (groupedTodos[MISC_GROUP.id] == null) {
            groupedTodos[MISC_GROUP.id] = [];
          }
          groupedTodos[MISC_GROUP.id].push(todo);
        }
      }

      return groupedTodos;
    }
  );

  private hasGroupedTodos = defaultMemoize((groupedTodos: Record<string, readonly Todo[]>) => {
    return Object.keys(groupedTodos).length > 1;
  });

  private getGroupOrderedTodos = defaultMemoize(
    (todos: readonly Todo[], groups: readonly TodoGroup[]) => {
      const groupedTodos = this.getGroupedTodos(todos, groups);
      let groupOrderedTodos: Todo[] = [];

      for (const group of groups.concat(MISC_GROUP)) {
        if (groupedTodos[group.id] != null) {
          groupOrderedTodos = groupOrderedTodos.concat(groupedTodos[group.id]);
        }
      }

      return groupOrderedTodos;
    }
  );

  private getGroupsById = defaultMemoize((groups: readonly TodoGroup[]) =>
    keyBy(groups.concat(MISC_GROUP), group => group.id)
  );
}

const getItemKey = (todo: Todo) => todo.id;
