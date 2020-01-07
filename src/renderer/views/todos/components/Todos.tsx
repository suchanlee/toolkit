import * as React from "react";
import { TodosDayList } from "./TodosDayList";
import { TodosInitButton } from "./TodosInitButton";
import { TodosPanel } from "./TodosPanel";

export namespace Todos {
  export interface Props {}
}

export class Todos extends React.PureComponent<Todos.Props> {
  public render() {
    return (
      <div className="todos">
        <TodosInitButton />
        <TodosDayList />
        <TodosPanel />
      </div>
    );
  }
}
