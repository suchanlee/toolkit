import { noop } from "lodash-es";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { createKNL } from "../../../shared-components/KeyNavList";
import { Todo, TodosDay } from "../redux/todosTypes";
import { TodoItem } from "./TodoItem";

const KNL = createKNL<Todo>();

export namespace TodosList {
  export interface Props {
    day: TodosDay;
  }
}

export class TodosList extends React.PureComponent<TodosList.Props> {
  private listId = uuid();

  public render() {
    return (
      <KNL
        className="todos-list"
        id={this.listId}
        items={this.props.day.todos}
        onItemSelect={noop}
        getItemKey={getItemKey}
        renderItem={renderItem}
      />
    );
  }
}

const getItemKey = (todo: Todo) => todo.id;

function renderItem(todo: Todo) {
  return <TodoItem todo={todo} />;
}
