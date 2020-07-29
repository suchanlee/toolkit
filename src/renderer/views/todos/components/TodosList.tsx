import { noop } from "lodash-es";
import * as React from "react";
import { createKNL } from "../../../shared-components/KeyNavList";
import { Todo, TodosDay } from "../redux/todosTypes";
import { TodoGroupsButton } from "./TodoGroupsButton";
import { TodoItem } from "./TodoItem";

require("./TodosList.scss");

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
        {!this.props.isReadonly && <TodoGroupsButton />}
      </div>
    );
  }

  private renderItem = (todo: Todo, index: number, listId: string) => {
    return (
      <TodoItem
        todo={todo}
        date={this.props.day.date}
        isReadonly={this.props.isReadonly}
        listId={listId}
        rowIndex={index}
      />
    );
  };
}

const getItemKey = (todo: Todo) => todo.id;
