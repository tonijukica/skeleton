import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer, userInitialState } from './reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const initialState = {
  user: userInitialState
}
const rootReducer = combineReducers({
  user: userReducer
});

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}
const loadState = () => {

    const serializedState = localStorage.getItem('state');
    if (serializedState == 'undefined') {
      return undefined;
    }
    return JSON.parse(serializedState);
}

export const initializeStore = () => {
  const loadedState = loadState();
  const store = createStore(rootReducer, loadedState ? loadedState : initialState, composeWithDevTools(
    applyMiddleware(thunk)
  ));
  store.subscribe(() => saveState(store.getState()));
  return store;
}