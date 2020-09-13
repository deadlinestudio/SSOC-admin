import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import member, {memberSaga} from "./member/member";
import club, {clubSaga} from "./club/club";
import loading from './loading';
import sideBarShow from './sideBarShow';

const rootReducer = combineReducers({
    loading,
    member,
    club,
    sideBarShow
});

export function* rootSaga(){
    yield all([memberSaga(),clubSaga()]);
}

export default rootReducer;