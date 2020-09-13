import {createAction, handleActions} from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';

// 코드그룹 리스트 초기화
const INITIALIZE_CODEGROUPLIST = 'code/INITIALIZE_CODEGROUPLIST';

// 코드그룹 리스트 정보 확인
const [GET_CODEGROUPLIST, GET_CODEGROUPLIST_SUCCESS, GET_CODEGROUPLIST_FAILURE] = createRequestActionTypes(
    'code/GET_CODEGROUPLIST',
);

export const getCodeGroupList = createAction(GET_CODEGROUPLIST);
export const initCodeGroupList = createAction(INITIALIZE_CODEGROUPLIST);

const getCodeGroupListSaga = createRequestSaga(GET_CODEGROUPLIST, authAPI.getCodeGroupList);

export function* codeGroupSaga(){
    yield takeLatest(GET_CODEGROUPLIST, getCodeGroupListSaga);
}

const initialState = {
    codeGroupList: null,
    initDone : null,
    getDone : null,
};

const codeGroup = handleActions(
    {
       // 코드그룹 리스트 초기화
         [INITIALIZE_CODEGROUPLIST]: (state) => ({
            ...state,
            codeGroupList: null,
             initDone: true,
             getDone : null,
        }),
        // 코드그룹 리스트 조회 성공
        [GET_CODEGROUPLIST_SUCCESS]: (state, { payload: List }) => ({
            ...state,
            codeGroupList : List,
            getDone : true,
        }),
        // 코드그룹 리스트 조회 실패
        [GET_CODEGROUPLIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            getDone : error
        })
    },
    initialState
);

export default codeGroup;
