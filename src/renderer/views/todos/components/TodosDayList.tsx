import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { v4 as uuid } from "uuid";
import { KeyNavList, KeyNavListInternal } from "../../../shared-components/KeyNavList";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { selectTodosDays } from "../redux/todosSelectors";
import { TodosDay } from "../redux/todosTypes";
import { todoDateToStr } from "../utils/todoDateUtils";
import { TodosDayItem } from "./TodosDayItem";

// hack due connected component not properly supporting generic components
const KNL = KeyNavList as ConnectedComponent<
  typeof KeyNavListInternal,
  KeyNavList.OwnProps<TodosDay>
>;

export namespace TodosDayList {
  export interface StoreProps {
    days: readonly TodosDay[];
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
        getItemKey={getItemKey}
        onItemSelect={this.handleSelect}
        renderItem={renderItem}
      />
    );
  }

  private handleSelect = (day: TodosDay) => {
    this.props.setActive(day.date);
  };
}

function getItemKey(day: TodosDay) {
  return todoDateToStr(day.date);
}

function renderItem(day: TodosDay) {
  return <TodosDayItem day={day} />;
}

function mapStateToProps(state: RootState): TodosDayList.StoreProps {
  return {
    days: selectTodosDays(state)
  };
}

const mapDispatchToProps: TodosDayList.DispatchProps = {
  setActive: TodosActions.setActive
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const TodosDayList = enhanceWithRedux(TodosDayListInternal);
