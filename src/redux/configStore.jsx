import {applyMiddleware, combineReducers, createStore} from 'redux';
import { thunk } from 'redux-thunk';
import { CarouselReducer } from './reducers/CarouselReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
const dummyReducer = (state = {}, ) => state;

const rootReducer = combineReducers({
  // Add your reducers here
  CarouselReducer, 
  QuanLyPhimReducer,
  dummy: dummyReducer
})

export const store= createStore(
  rootReducer, applyMiddleware(thunk)
);