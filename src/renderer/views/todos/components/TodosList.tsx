import { groupBy, noop } from "lodash-es";
import * as React from "react";
import { defaultMemoize } from "reselect";
import { createKNL } from "../../../shared-components/KeyNavList";
import { Todo, TodosDay } from "../redux/todosTypes";
import { TODO_DEFAULT_GROUP } from "../todosObjects";
import { TodoItem } from "./TodoItem";

require("./TodosList.scss");

const KNL = createKNL<Todo>();

export namespace TodosList {
  export interface Props {
    listId: string;
    isReadonly: boolean;
    day: TodosDay;
    setEscapeKeyCloseDisabled(isDisabled: boolean): void;
  }
}

export class TodosList extends React.PureComponent<TodosList.Props> {
  public render() {
    return (
      <div className="todos-list">
        <KNL
          className="todos-list-nav-list"
          id={this.props.listId}
          items={this.props.day.todos}
          isDisabled={this.props.isReadonly}
          onItemSelect={noop}
          getItemKey={getItemKey}
          renderItem={this.renderItem}
        />
      </div>
    );
  }

  private renderItem = (todo: Todo, index: number, listId: string) => {
    const groupedTodos = this.getGroupedTodos(this.props.day.todos);
    const todoElement = (
      <TodoItem
        todo={todo}
        date={this.props.day.date}
        isReadonly={this.props.isReadonly}
        listId={listId}
        rowIndex={index}
      />
    );

    if (groupedTodos[todo.group!][0]?.id === todo.id) {
      return (
        <React.Fragment>
          <div className="todos-list-group">{todo.group ?? TODO_DEFAULT_GROUP}</div>
          {todoElement}
        </React.Fragment>
      );
    }
    return todoElement;
  };

  private getGroupedTodos = defaultMemoize((todos: readonly Todo[]) =>
    groupBy(todos, todo => todo.group)
  );
}

const getItemKey = (todo: Todo) => todo.id;
