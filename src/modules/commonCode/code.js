import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as commonCodeAPI from "../../lib/api/commonCode";

// 코드 리스트 초기화
const INITIALIZE_CODELIST = "common/code/INITIALIZE_CODELIST";

// 메인코드 리스트 정보 확인
const [
  GET_MAINCODELIST,
  GET_MAINCODELIST_SUCCESS,
  GET_MAINCODELIST_FAILURE,
] = createRequestActionTypes("common/code/GET_MAINCODELIST");

// 서브코드 리스트 정보 확인
const [
  GET_SUBCODELIST,
  GET_SUBCODELIST_SUCCESS,
  GET_SUBCODELIST_FAILURE,
] = createRequestActionTypes("common/code/GET_SUBCODELIST");

// 코드 추가
const [
  POST_CODE,
  POST_CODE_SUCCESS,
  POST_CODE_FAILURE,
] = createRequestActionTypes("common/code/POST_CODE");

// 코드 삭제
const [
  DELETE_CODE,
  DELETE_CODE_SUCCESS,
  DELETE_CODE_FAILURE,
] = createRequestActionTypes("common/code/DELETE_CODE");

// 코드 수정
const [PUT_CODE, PUT_CODE_SUCCESS, PUT_CODE_FAILURE] = createRequestActionTypes(
  "common/code/PUT_CODE"
);

const CHANGE_FIELD = "common/code/CHANGE_FIELD";
const INITIALIZE_FORM = "common/code/INITIAL_FROM";

export const getMainCodeList = createAction(
  GET_MAINCODELIST,
  ({ codeGroupId }) => ({ codeGroupId })
);
export const getSubCodeList = createAction(
  GET_SUBCODELIST,
  ({ codeGroupId, codeId }) => ({ codeGroupId, codeId })
);
export const initCodeList = createAction(INITIALIZE_CODELIST);
export const postCode = createAction(
  POST_CODE,
  ({ codeGroupId, id, definition }) => ({ codeGroupId, id, definition })
);
export const deleteCode = createAction(
  DELETE_CODE,
  ({ codeGroupId, codeId }) => ({ codeGroupId, codeId })
);
export const putCode = createAction(
  PUT_CODE,
  ({ codeGroupId, codeId, definition }) => ({ codeGroupId, codeId, definition })
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

const getMainCodeListSaga = createRequestSaga(
  GET_MAINCODELIST,
  commonCodeAPI.getMainCodeList
);
const getSubCodeListSaga = createRequestSaga(
  GET_SUBCODELIST,
  commonCodeAPI.getSubCodeList
);
const postCodeSaga = createRequestSaga(
  POST_CODE,
  commonCodeAPI.postCode
);
const deleteCodeSaga = createRequestSaga(
  DELETE_CODE,
  commonCodeAPI.deleteCode
);
const putCodeSaga = createRequestSaga(
  PUT_CODE,
  commonCodeAPI.putCode
);

export function* codeSaga() {
  yield takeLatest(GET_MAINCODELIST, getMainCodeListSaga);
  yield takeLatest(GET_SUBCODELIST, getSubCodeListSaga);
  yield takeLatest(POST_CODE,postCodeSaga);
  yield takeLatest(DELETE_CODE,deleteCodeSaga);
  yield takeLatest(PUT_CODE,putCodeSaga);
}

const initialState = {
  register: {
    definition: "",
    id: "",
  },
  update: {
    definition: "",
  },
  registerDone: null,
  regInitDone: null,
  deleteDone: null,
  updateDone: null,
  mainCodeList: null,
  subCodeList: null,
  initDone: null,
  getMainDone: null,
  getSubDone: null,
};

const code = handleActions(
  {
    // 코드 리스트 초기화
    [INITIALIZE_CODELIST]: (state) => ({
      ...state,
      mainCodeList: null,
      subCodeList: null,
      initDone: true,
      getMainDone: null,
      getSubDone: null,
    }),
    // 메인 코드 리스트 조회 성공
    [GET_MAINCODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      mainCodeList: List,
      getMainDone: true,
      initDone: null,
    }),
    // 메인 코드 리스트 조회 실패
    [GET_MAINCODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getMainDone: error,
    }),
    // 서브 코드 리스트 조회 성공
    [GET_SUBCODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      subCodeList: List.subCodeList,
      getSubDone: true,
      initDone: null,
    }),
    // 서브 코드 리스트 조회 실패
    [GET_SUBCODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getSubDone: error,
    }),
    // 코드 인풋 초기화
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      registerDone: null,
      regInitDone: true,
    }),
    // 코드 인풋 수정
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    // 코드 등록 성공
    [POST_CODE_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      registerDone: true,
    }),
    // 코드 등록 실패
    [POST_CODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      registerDone: error,
    }),
    // 코드 삭제 성공
    [DELETE_CODE_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      deleteDone: true,
    }),
    // 코드 삭제 실패
    [DELETE_CODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      deleteDone: error,
    }),
    // 코드 수정 성공
    [PUT_CODE_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      updateDone: true,
    }),
    // 코드 수정 실패
    [PUT_CODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateDone: error,
    }),
  },
  initialState
);

export default code;
