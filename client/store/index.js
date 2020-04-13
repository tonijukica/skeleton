import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { userReducer, userInitialState } from './reducers/userReducer';
import thunk from 'redux-thunk'

const initialState = {
  user: userInitialState
}
const rootReducer = combineReducers({
  user: userReducer
});

export const initializeStore = () => {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
  return store;
}