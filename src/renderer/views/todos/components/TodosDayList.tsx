import * as React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { createKNL } from "../../../shared-components/KeyNavList";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import {
  selectTodosDays,
  selectTodosHasActive,
  selectTodosSundaysByDateDateStr
} from "../redux/todosSelectors";
import { TodosDay } from "../redux/todosTypes";
import { createTodoDate, todoDateToStr } from "../utils/todoDateUtils";
import { TodosDayItem } from "./TodosDayItem";

require("./TodosDayList.scss");

const KNL = createKNL<TodosDay>();

export namespace TodosDayList {
  export interface StoreProps {
    days: readonly TodosDay[];
    sundaysByDateDateStr: Map<string, Date>;
    hasActive: boolean;
  }

  export interface DispatchProps {
    setActive: typeof TodosActions.setActive;
  }

  export type Props = StoreProps & DispatchProps;
}

class TodosDayListInternal extends React.PureComponent<TodosDayList.Props> {
  private listId = uuid();

  public render() {
    return (
      <KNL
        className="todos-day-list"
        id={this.listId}
        items={this.props.days}
        isDisabled={this.props.hasActive}
        getItemKey={getItemKey}
        onItemSelect={this.handleSelect}
        renderItem={this.renderItem}
      />
    );
  }

  private handleSelect = (day: TodosDay) => {
    this.props.setActive(day.date);
  };

  private renderItem = (day: TodosDay) => {
    const sunday = this.props.sundaysByDateDateStr.get(todoDateToStr(day.date));
    if (sunday != null) {
      return (
        <React.Fragment>
          <div className="todos-day-week">Week of {todoDateToStr(createTodoDate(sunday))}</div>
          <TodosDayItem day={day} />
        </React.Fragment>
      );
    }
    return <TodosDayItem day={day} />;
  };
}

function getItemKey(day: TodosDay) {
  return todoDateToStr(day.date);
}

function mapStateToProps(state: RootState): TodosDayList.StoreProps {
  return {
    days: selectTodosDays(state),
    sundaysByDateDateStr: selectTodosSundaysByDateDateStr(state),
    hasActive: selectTodosHasActive(state)
  };
}

const mapDispatchToProps: TodosDayList.DispatchProps = {
  setActive: TodosActions.setActive
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const TodosDayList = enhanceWithRedux(TodosDayListInternal);
