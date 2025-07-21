import {applyMiddleware, combineReducers, createStore} from 'redux';
import { thunk } from 'redux-thunk';
import { CarouselReducer } from './reducers/CarouselReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
const dummyReducer = (state = {}, ) => state;

const rootReducer = combineReducers({
  // Add your reducers here
  CarouselReducer, 
  QuanLyPhimReducer,
  QuanLyRapReducer,
  dummy: dummyReducer
})

export const store= createStore(
  rootReducer, applyMiddleware(thunk)
);