import { createSelector } from "@ngrx/store";
import { getUiState } from ".";

export const isTodoListLoading = createSelector(getUiState,
  (ui) => ui.loadingTodoList
);

export const getTodoListError = createSelector(getUiState,
  (ui) => ui.todoListError
);
