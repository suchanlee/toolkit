import React, { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Todo, TodoDate } from "../redux/todosTypes";
import { TodoItem } from "./TodoItem";

export interface TodoGroupProps {
  group: string;
  todos: readonly Todo[];
  index: number;
  date: TodoDate;
  listId: string;
  isReadonly: boolean;
  isDraggingGroups: boolean;
}

export const TodoGroup = memo(
  ({ group, todos, index, date, listId, isReadonly, isDraggingGroups }: TodoGroupProps) => {
    return (
      // tslint:disable-next-line: no-increment-decrement
      <Draggable draggableId={group} index={index} isDragDisabled={isReadonly}>
        {provided => (
          <div
            className="todos-list-group-container"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div className="todos-list-group">
              {group} [{index}]
            </div>
            <Droppable
              droppableId="todos"
              isDropDisabled={isDraggingGroups || isReadonly}
              type="droppableSubItem"
            >
              {provided => (
                <div>
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {todos.map((todo, index) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        date={date}
                        isReadonly={isReadonly}
                        isDragDisabled={isDraggingGroups || isReadonly}
                        listId={listId}
                        // tslint:disable-next-line: no-increment-decrement
                        rowIndex={index}
                      />
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {(provided as any).placeholder}
          </div>
        )}
      </Draggable>
    );
  }
);
