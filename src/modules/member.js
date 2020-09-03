import {createAction, handleActions} from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

// 멤버리스트 초기화
const INITIALIZE_MEMBERLIST = 'member/INITIALIZE_MEMBERLIST';

// 멤버리스트 정보 확인
const [GET_MEMBERLIST, GET_MEMBERLIST_SUCCESS, GET_MEMBERLIST_FAILURE] = createRequestActionTypes(
    'member/GET_MEMBERLIST',
);

export const getMemberList = createAction(GET_MEMBERLIST);
export const initMemberList = createAction(INITIALIZE_MEMBERLIST);

const getMemberListSaga = createRequestSaga(GET_MEMBERLIST, authAPI.getMemberList);

export function* memberSaga(){
    yield takeLatest(GET_MEMBERLIST, getMemberListSaga);
}

const initialState = {
    memberList: null,
    initDone : null,
    getDone : null,
};

const member = handleActions(
    {
       // 멤버리스트 초기화
         [INITIALIZE_MEMBERLIST]: (state) => ({
            ...state,
             memberList: null,
             initDone: true,
             getDone : null,
        }),
        // 멤버리스트 조회 성공
        [GET_MEMBERLIST_SUCCESS]: (state, { payload: List }) => ({
            ...state,
            memberList : List,
            getDone : true,
        }),
        // 멤버리스트 조회 실패
        [GET_MEMBERLIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            getDone : error
        })
    },
    initialState
);

export default member;