import { combineReducers } from 'redux';
import burgerBuilder from './burgerBuilder';
import order from './order';

export const rootReducer = combineReducers({
    burgerBuilder,
    order,
});