import {applyMiddleware, combineReducers, createStore} from 'redux';
import { thunk } from 'redux-thunk';
const dummyReducer = (state = {}, ) => state;

const rootReducer = combineReducers({
  // Add your reducers here 
  dummy: dummyReducer
})

export const store= createStore(
  rootReducer, applyMiddleware(thunk)
);