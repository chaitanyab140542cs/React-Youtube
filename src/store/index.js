import { createStore, combineReducers,applyMiddleware } from 'redux';
import  SearchReducer  from '../reducers/searchreducer';
import createSagaMiddleware from 'redux-saga';
import { delay } from 'redux-saga'
import { put, takeEvery,call } from 'redux-saga/effects'
import watchGetVideos from '../actions/getvideos'
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers({search : SearchReducer}),applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchGetVideos);
 export default store;
