import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
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

// 에러코드 추가
const [POST_ERRORCODE, POST_ERRORCODE_SUCCESS, POST_ERRORCODE_FAILURE] = createRequestActionTypes(
    'code/POST_ERRORCODE',
);

const CHANGE_FIELD = 'code/CHANGE_FIELD';
const INITIALIZE_FORM = 'code/INITIAL_FROM';

export const getErrorCodeList = createAction(GET_ERRORCODELIST);
export const initErrorCodeList = createAction(INITIALIZE_ERRORCODELIST);
export const postErrorCode = createAction(POST_ERRORCODE,({id,message})=>({id, message}));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register , login
        key, // id, message
        value // 실제 바꾸려는 값
    })
);
const getErrorCodeListSaga = createRequestSaga(GET_ERRORCODELIST, authAPI.getErrorCodeList);
const postErrorCodeSaga = createRequestSaga(POST_ERRORCODE, authAPI.postErrorCode);

export function* errorCodeSaga(){
    yield takeLatest(GET_ERRORCODELIST, getErrorCodeListSaga);
    yield takeLatest(POST_ERRORCODE, postErrorCodeSaga);
}

const initialState = {
    register:{
        id: '',
        message: ''
    },
    errorCodeList: null,
    initDone : null,
    getDone : null,
    registerDone: null,
    regInitDone : null
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
        }),
        // 에러코드 인풋 초기화
        [INITIALIZE_FORM]: (state,{payload:form}) => ({
            ...state,
            [form]:initialState[form],
            registerDone: null,
            regInitDone : true
        }),
        // 에러코드 인풋 수정
        [CHANGE_FIELD]:(state, {payload : {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            })
        ,
        // 에러코드 등록 성공
        [POST_ERRORCODE_SUCCESS]: (state, { payload: success }) => ({
            ...state,
            registerDone : true,
        }),
        // 에러코드 등록 실패
        [POST_ERRORCODE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            registerDone : error,
        }),
    },
    initialState
);

export default errorCode;
