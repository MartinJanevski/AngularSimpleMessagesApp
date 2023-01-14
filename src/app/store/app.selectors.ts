import { createSelector } from '@ngrx/store';
import { AppStateInterface, AppStateInterfaceState } from './store.model';

export const selectState = (state: AppStateInterfaceState) => state;

export const isLoadingSelector = createSelector(selectState, (state) => {
  return state.state.isLoading;
});

export const messagesSelector = createSelector(selectState, (state) => {
  return state.state.messeges;
});

export const errorSelector = createSelector(selectState, (state) => {
  return state.state.error;
});

export const modalOpnedSelector = createSelector(selectState, (state) => {
  return state.state.modalOpened;
});
