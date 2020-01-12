import { noop } from "lodash-es";
import * as React from "react";
import { defaultMemoize } from "reselect";
import { createKNL } from "../../../shared-components/KeyNavList";
import { Todo, TodosDay, TodoType } from "../redux/todosTypes";
import { TodoItem } from "./TodoItem";

const KNL = createKNL<Todo>();

export namespace TodosList {
  export interface Props {
    listId: string;
    isReadonly: boolean;
    day: TodosDay;
  }
}

export class TodosList extends React.PureComponent<TodosList.Props> {
  public render() {
    const groupedTodosByType = this.getGroupedTodosByType(this.props.day.todos);
    const groupOrderedTodos = groupedTodosByType.DAY.concat(groupedTodosByType.WEEK);
    return (
      <KNL
        className="todos-list"
        id={this.props.listId}
        items={groupOrderedTodos}
        isDisabled={this.props.isReadonly}
        onItemSelect={noop}
        getItemKey={getItemKey}
        renderItem={this.renderItem}
      />
    );
  }

  private renderItem = (todo: Todo, index: number, listId: string) => {
    const groupedTodosByType = this.getGroupedTodosByType(this.props.day.todos);
    const todoElement = (
      <TodoItem
        todo={todo}
        date={this.props.day.date}
        isReadonly={this.props.isReadonly}
        listId={listId}
        rowIndex={index}
      />
    );
    if (groupedTodosByType.DAY[0]?.id === todo.id) {
      return (
        <React.Fragment>
          <div className="todos-list-group">DAY TODOS</div>
          {todoElement}
        </React.Fragment>
      );
    } else if (groupedTodosByType.WEEK[0]?.id === todo.id) {
      return (
        <React.Fragment>
          <div className="todos-list-group">WEEK TODOS</div>
          {todoElement}
        </React.Fragment>
      );
    }
    return todoElement;
  };

  private getGroupedTodosByType = defaultMemoize((todos: readonly Todo[]) => {
    const todosByType: Record<TodoType, Todo[]> = {
      [TodoType.DAY]: [],
      [TodoType.WEEK]: []
    };

    for (const todo of todos) {
      todosByType[todo.todoType].push(todo);
    }

    return todosByType;
  });
}

const getItemKey = (todo: Todo) => todo.id;
