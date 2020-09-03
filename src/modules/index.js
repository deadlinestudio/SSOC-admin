import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import member, {memberSaga} from "./member";
import loading from './loading';
import sideBarShow from './sideBarShow';

const rootReducer = combineReducers({
    loading,
    member,
    sideBarShow
});

export function* rootSaga(){
    yield all([memberSaga()]);
}

export default rootReducer;