import { getTodoState } from ".";
import { createSelector } from "@ngrx/store";
import { selectTodoIds, selectTodosEntities } from "../reducers/todo.reducer";

export const getTodoIds = createSelector(getTodoState, selectTodoIds);
export const getTodoEntities = createSelector(getTodoState, selectTodosEntities);
