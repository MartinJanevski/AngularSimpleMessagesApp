import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as appActions from './app.actions';
import { AppStateInterface } from './store.model';

const initialState: AppStateInterface = {
  isLoading: false,
  error: null,
  messeges: [],
  modalOpened: false,
};

export const reducers = createReducer(
  initialState,
  on(appActions.getMesseges, (state) => ({ ...state, isLoading: true })),
  on(appActions.getMessegesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    messeges: action.messages,
  })),
  on(appActions.getMessegesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(appActions.addMessage, (state) => ({
    ...state,
    isLoading: true,
    modalOpened: true,
  })),
  on(appActions.addMessageSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    modalOpened: false,
    messeges: [
      ...state.messeges,
      { ...action.message, autogeneratedID: action.autogeneratedID },
    ],
  })),
  on(appActions.addMessageFailure, (state, action) => ({
    ...state,
    isLoading: false,
    modalOpened: false,
    error: action.error,
  })),
  on(appActions.removeMessage, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(appActions.removeMessageSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    messeges: state.messeges.filter(
      (msg) => msg.autogeneratedID !== action.autogeneratedID
    ),
  })),
  on(appActions.removeMessageFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
