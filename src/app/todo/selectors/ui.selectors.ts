import { createSelector } from "@ngrx/store";
import { getUiState } from ".";

export const isTodoListLoading = createSelector(getUiState,
  (ui) => ui.loadingTodoList
);

export const isTodoListLoaded = createSelector(getUiState,
  (ui) => ui.todoListLoaded
);

export const getTodoListError = createSelector(getUiState,
  (ui) => ui.todoListError
);

export const getTodoLoadingById = createSelector(getUiState,
  (ui) => ui.loadingTodoById
);

export const getTodoErrorById = createSelector(getUiState,
  (ui) => ui.errorTodoById
);
