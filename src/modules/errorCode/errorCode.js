import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as errorCodeAPI from "../../lib/api/errorCode";

// 에러코드 리스트 초기화
const INITIALIZE_ERRORCODELIST = "error/INITIALIZE_ERRORCODELIST";

// 에러코드 리스트 정보 확인
const [
  GET_ERRORCODELIST,
  GET_ERRORCODELIST_SUCCESS,
  GET_ERRORCODELIST_FAILURE,
] = createRequestActionTypes("error/GET_ERRORCODELIST");

// 에러코드 추가
const [
  POST_ERRORCODE,
  POST_ERRORCODE_SUCCESS,
  POST_ERRORCODE_FAILURE,
] = createRequestActionTypes("error/POST_ERRORCODE");

// 에러코드 삭제
const [
  DELETE_ERRORCODE,
  DELETE_ERRORCODE_SUCCESS,
  DELETE_ERRORCODE_FAILURE,
] = createRequestActionTypes("error/DELETE_ERRORCODE");

// 에러코드 수정
const [
  PUT_ERRORCODE,
  PUT_ERRORCODE_SUCCESS,
  PUT_ERRORCODE_FAILURE,
] = createRequestActionTypes("error/PUT_ERRORCODE");

const CHANGE_FIELD = "error/CHANGE_FIELD";
const INITIALIZE_FORM = "error/INITIAL_FROM";

export const getErrorCodeList = createAction(GET_ERRORCODELIST);
export const initErrorCodeList = createAction(INITIALIZE_ERRORCODELIST);
export const postErrorCode = createAction(
  POST_ERRORCODE,
  ({ id, message }) => ({ id, message })
);
export const deleteErrorCode = createAction(DELETE_ERRORCODE, (id) => id);
export const putErrorCode = createAction(
  PUT_ERRORCODE,
  ({ id, message }) => ({ id, message })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // id, message
    value, // 실제 바꾸려는 값
  })
);
const getErrorCodeListSaga = createRequestSaga(
  GET_ERRORCODELIST,
  errorCodeAPI.getErrorCodeList
);
const postErrorCodeSaga = createRequestSaga(
  POST_ERRORCODE,
  errorCodeAPI.postErrorCode
);
const deleteErrorCodeSaga = createRequestSaga(
  DELETE_ERRORCODE,
  errorCodeAPI.deleteErrorCode
);
const putErrorCodeSaga = createRequestSaga(PUT_ERRORCODE, errorCodeAPI.putErrorCode);

export function* errorCodeSaga() {
  yield takeLatest(GET_ERRORCODELIST, getErrorCodeListSaga);
  yield takeLatest(POST_ERRORCODE, postErrorCodeSaga);
  yield takeLatest(DELETE_ERRORCODE, deleteErrorCodeSaga);
  yield takeLatest(PUT_ERRORCODE, putErrorCodeSaga);
}

const initialState = {
  register: {
    id: "",
    message: "",
  },
  update: {
    message : ""
  },
  errorCodeList: null,
  initDone: null,
  getDone: null,
  registerDone: null,
  regInitDone: null,
  deleteDone: null,
  updateDone: null,
};

const errorCode = handleActions(
  {
    // 에러코드 리스트 초기화
    [INITIALIZE_ERRORCODELIST]: (state) => ({
      ...state,
      errorCodeList: null,
      initDone: true,
      getDone: null,
      registerDone: null,
      regInitDone: null,
      deleteDone: null,
      updateDone: null,
    }),
    // 에러코드 리스트 조회 성공
    [GET_ERRORCODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      errorCodeList: List,
      getDone: true,
    }),
    // 에러코드 리스트 조회 실패
    [GET_ERRORCODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error,
    }),
    // 에러코드 인풋 초기화
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      registerDone: null,
      regInitDone: true,
    }),
    // 에러코드 인풋 수정
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    // 에러코드 등록 성공
    [POST_ERRORCODE_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      registerDone: true,
    }),
    // 에러코드 등록 실패
    [POST_ERRORCODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      registerDone: error,
    }),
    // 에러코드 삭제 성공
    [DELETE_ERRORCODE_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      deleteDone: true,
    }),
    // 에러코드 삭제 실패
    [DELETE_ERRORCODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      deleteDone: error,
    }),
    // 에러코드 수정 성공
    [PUT_ERRORCODE_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      updateDone: true,
    }),
    // 에러코드 수정 실패
    [PUT_ERRORCODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateDone: error,
    }),
  },
  initialState
);

export default errorCode;
