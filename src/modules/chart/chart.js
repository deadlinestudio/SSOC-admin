import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as chartAPI from "../../lib/api/chart";

// 차트 정보 초기화
const INITIALIZE_INFO = "chart/INITIALIZE_INFO";

// 로그 정보 확인
const [
  GET_MEMBERSEXRATIO,
  GET_MEMBERSEXRATIO_SUCCESS,
  GET_MEMBERSEXRATIOG_FAILURE,
] = createRequestActionTypes("chart/GET_MEMBERSEXRATIO");

export const getMemberSexRatio = createAction(GET_MEMBERSEXRATIO);
export const initInfo = createAction(INITIALIZE_INFO);

const getMemberSexRatioSaga = createRequestSaga(
  GET_MEMBERSEXRATIO,
  chartAPI.getMemberSexRatio
);

export function* chartSaga() {
  yield takeLatest(GET_MEMBERSEXRATIO, getMemberSexRatioSaga);
}

const initialState = {
  memberSexRatio: null,
  initDone: null,
  getMSRDone: null,
};

const chart = handleActions(
  {
    // 초기화
    [INITIALIZE_INFO]: (state) => ({
      ...state,
      memberSexRatio : null,
      initDone: true,
      getMSRDone: null,
    }),
    // 회원 성비 조회 성공
    [GET_MEMBERSEXRATIO_SUCCESS]: (state, { payload: info }) => ({
      ...state,
      memberSexRatio: info,
      getMSRDone: true,
    }),
    // 회원 성비 조회 실패
    [GET_MEMBERSEXRATIOG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getMSRDone: error,
    }),
  },
  initialState
);

export default chart;
