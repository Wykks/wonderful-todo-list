import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModuleTodoState } from "../reducers";

export const getModuleTodoState = createFeatureSelector<ModuleTodoState>('module-todo');

export const getUiState = createSelector(getModuleTodoState, (state) => state.ui);
export const getTodoState = createSelector(getModuleTodoState, (state) => state.todo);
