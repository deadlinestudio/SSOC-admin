import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as logAPI from "../../lib/api/log";

// 로그 초기화
const INITIALIZE_LOG = "log/INITIALIZE_LOG";

// 로그 정보 확인
const [
  GET_LOG,
  GET_LOG_SUCCESS,
  GET_LOG_FAILURE,
] = createRequestActionTypes("log/GET_LOG");

export const getLog = createAction(GET_LOG,({ year, month, date }) => ({ year, month, date }));
export const initLog = createAction(INITIALIZE_LOG);

const getLogSaga = createRequestSaga(
  GET_LOG,
  logAPI.getLog
);

export function* logSaga() {
  yield takeLatest(GET_LOG, getLogSaga);
}

const initialState = {
  log: null,
  initDone: null,
  getDone: null,
};

const log = handleActions(
  {
    // 초기화
    [INITIALIZE_LOG]: (state) => ({
      ...state,
      log : null,
      initDone: true,
      getDone: null,
    }),
    // 로그 조회 성공
    [GET_LOG_SUCCESS]: (state, { payload: logContent }) => ({
      ...state,
      log: logContent,
      getDone: true,
    }),
    // 로그 조회 실패
    [GET_LOG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error,
    }),
  },
  initialState
);

export default log;
