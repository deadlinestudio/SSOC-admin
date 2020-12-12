import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as commonCodeAPI from "../../lib/api/commonCode";

// 코드 리스트 초기화
const INITIALIZE_CODELIST = "common/INITIALIZE_CODELIST";

// 코드 리스트 정보 확인
const [
  GET_CODELIST,
  GET_CODELIST_SUCCESS,
  GET_CODELIST_FAILURE,
] = createRequestActionTypes("common/GET_CODELIST");

export const getCodeList = createAction(
  GET_CODELIST,
  ({ codeGroupId }) => ({ codeGroupId })
);
export const initCodeList = createAction(INITIALIZE_CODELIST);

const getCodeListSaga = createRequestSaga(
  GET_CODELIST,
  commonCodeAPI.getCodeList
);

export function* codeSaga() {
  yield takeLatest(GET_CODELIST, getCodeListSaga);
}

const initialState = {
  codeList: null,
  initDone: null,
  getDone: null,
};

const code = handleActions(
  {
    // 코드 리스트 초기화
    [INITIALIZE_CODELIST]: (state) => ({
      ...state,
      codeList: null,
      initDone: true,
      getDone: null,
    }),
    // 코드 리스트 조회 성공
    [GET_CODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      codeList: List,
      getDone: true,
    }),
    // 코드 리스트 조회 실패
    [GET_CODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error,
    }),
  },
  initialState
);

export default code;
