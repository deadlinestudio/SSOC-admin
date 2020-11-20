import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';

// 코드그룹 리스트 초기화
const INITIALIZE_CODEGROUPLIST = 'common/INITIALIZE_CODEGROUPLIST';

// 코드그룹 리스트 정보 확인
const [GET_CODEGROUPLIST, GET_CODEGROUPLIST_SUCCESS, GET_CODEGROUPLIST_FAILURE] = createRequestActionTypes(
    'common/GET_CODEGROUPLIST',
);

// 코드그룹 추가
const [POST_CODEGROUP, POST_CODEGROUP_SUCCESS, POST_CODEGROUP_FAILURE] = createRequestActionTypes(
    'common/POST_CODEGROUP',
);

// 코드그룹 삭제
const [DELETE_CODEGROUP, DELETE_CODEGROUP_SUCCESS, DELETE_CODEGROUP_FAILURE] = createRequestActionTypes(
    'common/DELETE_CODEGROUP',
);

const CHANGE_FIELD = 'common/CHANGE_FIELD';
const INITIALIZE_FORM = 'common/INITIAL_FROM';

export const getCodeGroupList = createAction(GET_CODEGROUPLIST);
export const initCodeGroupList = createAction(INITIALIZE_CODEGROUPLIST);
export const postCodeGroup = createAction(POST_CODEGROUP,({definition,id})=>({definition,id}));
export const deleteCodeGroup = createAction(DELETE_CODEGROUP,id => id);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register , login
        key, // id, message
        value // 실제 바꾸려는 값
    })
);

const getCodeGroupListSaga = createRequestSaga(GET_CODEGROUPLIST, authAPI.getCodeGroupList);
const postCodeGroupSaga = createRequestSaga(POST_CODEGROUP, authAPI.postCodeGroup);
const deleteCodeGroupSaga = createRequestSaga(DELETE_CODEGROUP, authAPI.deleteCodeGroup);

export function* codeGroupSaga(){
    yield takeLatest(GET_CODEGROUPLIST, getCodeGroupListSaga);
    yield takeLatest(POST_CODEGROUP, postCodeGroupSaga);
    yield takeLatest(DELETE_CODEGROUP, deleteCodeGroupSaga);
}

const initialState = {
    register:{
        definition: '',
        id: ''
    },
    codeGroupList: null,
    initDone : null,
    getDone : null,
    registerDone: null,
    regInitDone : null,
    deleteDone : null,
};

const codeGroup = handleActions(
    {
       // 코드그룹 리스트 초기화
         [INITIALIZE_CODEGROUPLIST]: (state) => ({
            ...state,
            codeGroupList: null,
             initDone: true,
             getDone : null,
             deleteDone : null
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
        }),
        // 코드그룹 인풋 초기화
        [INITIALIZE_FORM]: (state,{payload:form}) => ({
            ...state,
            [form]:initialState[form],
            registerDone: null,
            regInitDone : true
        }),
        // 코드그룹 인풋 수정
        [CHANGE_FIELD]:(state, {payload : {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            })
        ,
        // 코드그룹 등록 성공
        [POST_CODEGROUP_SUCCESS]: (state, { payload: success }) => ({
            ...state,
            registerDone : true,
        }),
        // 코드그룹 등록 실패
        [POST_CODEGROUP_FAILURE]: (state, { payload: error }) => ({
            ...state,
            registerDone : error,
        }),
        // 코드그룹 삭제 성공
        [DELETE_CODEGROUP_SUCCESS]: (state, { payload: success }) => ({
            ...state,
            deleteDone : true,
        }),
        // 코드그룹 삭제 실패
        [DELETE_CODEGROUP_FAILURE]: (state, { payload: error }) => ({
            ...state,
            deleteDone : error,
        })
    },
    initialState
);

export default codeGroup;
