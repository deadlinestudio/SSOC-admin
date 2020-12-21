import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as commonCodeAPI from "../../lib/api/commonCode";

// 코드 리스트 초기화
const INITIALIZE_CODELIST = "common/INITIALIZE_CODELIST";

// DONE flag 초기화
const INITIALIZE_DONELIST = "common/INITIALIZE_DONELIST"

// 카테고리 코드 리스트 정보 확인
const [
  GET_MAINCODELIST,
  GET_MAINCODELIST_SUCCESS,
  GET_MAINCODELIST_FAILURE,
] = createRequestActionTypes("common/GET_MAINCODELIST");

// 서브 카테고리 코드 리스트 정보 확인
const [
  GET_SUBCODELIST,
  GET_SUBCODELIST_SUCCESS,
  GET_SUBCODELIST_FAILURE,
] = createRequestActionTypes("common/GET_SUBCODELIST");

export const getMainCodeList = createAction(
  GET_MAINCODELIST,
  ({ codeGroupId }) => ({ codeGroupId })
);
export const getSubCodeList = createAction(
  GET_SUBCODELIST,
  ({ codeGroupId, codeId }) => ({ codeGroupId, codeId })
);
export const initCodeList = createAction(INITIALIZE_CODELIST);
export const initDoneList = createAction(INITIALIZE_DONELIST);

const getMainCodeListSaga = createRequestSaga(
  GET_MAINCODELIST,
  commonCodeAPI.getMainCodeList
);
const getSubCodeListSaga = createRequestSaga(
  GET_SUBCODELIST,
  commonCodeAPI.getSubCodeList
);

export function* codeSaga() {
  yield takeLatest(GET_MAINCODELIST, getMainCodeListSaga);
  yield takeLatest(GET_SUBCODELIST, getSubCodeListSaga);
}

const initialState = {
  mainCodeList: null,
  subCodeList: null,
  initDone: null,
  getMainDone: null,
  getSubDone: null
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
      getSubDone: null
    }),
    // Done 리스트 초기화
    [INITIALIZE_DONELIST]: (state) => ({
      ...state,
      initDone: null,
      getMainDone: null,
      getSubDone: null
    }),
    // 메인 코드 리스트 조회 성공
    [GET_MAINCODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      mainCodeList: List,
      getMainDone: true,
      initDone : null
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
      initDone : null
    }),
    // 서브 코드 리스트 조회 실패
    [GET_SUBCODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getSubDone: error,
    }),
  },
  initialState
);

export default code;
