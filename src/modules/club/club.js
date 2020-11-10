import {createAction, handleActions} from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';

// 클럽리스트 초기화
const INITIALIZE_CLUBLIST = 'club/INITIALIZE_CLUBLIST';

// 클럽리스트 정보 확인
const [GET_CLUBLIST, GET_CLUBLIST_SUCCESS, GET_CLUBLIST_FAILURE] = createRequestActionTypes(
    'club/GET_CLUBLIST',
);

export const getClubList = createAction(GET_CLUBLIST);
export const initClubList = createAction(INITIALIZE_CLUBLIST);

const getClubListSaga = createRequestSaga(GET_CLUBLIST, authAPI.getClubList);

export function* clubSaga(){
    yield takeLatest(GET_CLUBLIST, getClubListSaga);
}

const initialState = {
    clubList: null,
    initDone : null,
    getDone : null,
};

const club = handleActions(
    {
       // 멤버리스트 초기화
         [INITIALIZE_CLUBLIST]: (state) => ({
            ...state,
             clubList: null,
             initDone: true,
             getDone : null,
        }),
        // 멤버리스트 조회 성공
        [GET_CLUBLIST_SUCCESS]: (state, { payload: List }) => ({
            ...state,
            clubList : List,
            getDone : true,
        }),
        // 멤버리스트 조회 실패
        [GET_CLUBLIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            getDone : error
        })
    },
    initialState
);

export default club;
