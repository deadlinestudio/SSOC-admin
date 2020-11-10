import {createAction, handleActions} from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';

// 에러코드 리스트 초기화
const INITIALIZE_ERRORCODELIST = 'code/INITIALIZE_ERRORCODELIST';

// 에러코드 리스트 정보 확인
const [GET_ERRORCODELIST, GET_ERRORCODELIST_SUCCESS, GET_ERRORCODELIST_FAILURE] = createRequestActionTypes(
    'code/GET_ERRORCODELIST',
);

export const getErrorCodeList = createAction(GET_ERRORCODELIST);
export const initErrorCodeList = createAction(INITIALIZE_ERRORCODELIST);

const getErrorCodeListSaga = createRequestSaga(GET_ERRORCODELIST, authAPI.getErrorCodeList);

export function* errorCodeSaga(){
    yield takeLatest(GET_ERRORCODELIST, getErrorCodeListSaga);
}

const initialState = {
    errorCodeList: null,
    initDone : null,
    getDone : null,
};

const errorCode = handleActions(
    {
       // 에러코드 리스트 초기화
         [INITIALIZE_ERRORCODELIST]: (state) => ({
            ...state,
            errorCodeList: null,
             initDone: true,
             getDone : null,
        }),
        // 에러코드 리스트 조회 성공
        [GET_ERRORCODELIST_SUCCESS]: (state, { payload: List }) => ({
            ...state,
            errorCodeList : List,
            getDone : true,
        }),
        // 에러코드 리스트 조회 실패
        [GET_ERRORCODELIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            getDone : error
        })
    },
    initialState
);

export default errorCode;
