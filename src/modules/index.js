import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import member, {memberSaga} from "./member/member";
import club, {clubSaga} from "./club/club";
import codeGroup, {codeGroupSaga} from "./code/codeGroup";
import loading from './loading';
import sideBarShow from './sideBarShow';

const rootReducer = combineReducers({
    loading,
    member,
    club,
    codeGroup,
    sideBarShow
});

export function* rootSaga(){
    yield all([memberSaga(),clubSaga(),codeGroupSaga()]);
}

export default rootReducer;