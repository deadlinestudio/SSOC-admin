import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as cacheReloadAPI from "../../lib/api/cacheReload";

// 초기화
const INITIALIZE_CACHELIST = "cache/INITIALIZE_CACHELIST";

// 공통 코드 캐시 리로드
const [
  POST_COMMONCODE,
  POST_COMMONCODE_SUCCESS,
  POST_COMMONCODE_FAILURE,
] = createRequestActionTypes("cache/POST_COMMONCODE");

// 공통 코드 그룹 캐시 리로드
const [
  POST_COMMONCODEGROUP,
  POST_COMMONCODEGROUP_SUCCESS,
  POST_COMMONCODEGROUP_FAILURE,
] = createRequestActionTypes("cache/POST_COMMONCODE");

export const initCacheList = createAction(INITIALIZE_CACHELIST);

export const postCommonCode = createAction(
  POST_COMMONCODE,
  () => {}
);

export const postCommonCodeGroup = createAction(
  POST_COMMONCODEGROUP,
  () => {}
);

const postCommonCodeSaga = createRequestSaga(
  POST_COMMONCODE,
  cacheReloadAPI.postCommonCode
);

const postCommonCodeGroupSaga = createRequestSaga(
  POST_COMMONCODEGROUP,
  cacheReloadAPI.postCommonCodeGroup
);

export function* cacheReloadSaga() {
  yield takeLatest(POST_COMMONCODE, postCommonCodeSaga);
  yield takeLatest(POST_COMMONCODEGROUP, postCommonCodeGroupSaga);
}

const initialState = {
  commonCodeDone: null,
  commonCodeGroupDone: null
};

const cacheReload = handleActions(
  {
    // 캐시리스트 초기화
    [INITIALIZE_CACHELIST]: (state) => ({
      ...state,
      commonCodeDone: null,
      commonCodeGroupDone: null,
    }),
    // 공통코드 리로드 성공
    [POST_COMMONCODE_SUCCESS]: (state, { payload }) => ({
      ...state,
      commonCodeDone: true,
    }),
    // 공통코드 리로드 실패
    [POST_COMMONCODE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commonCodeDone: error,
    }),
    // 공통코드그룹 리로드 성공
    [POST_COMMONCODEGROUP_SUCCESS]: (state, { payload}) => ({
      ...state,
      commonCodeGroupDone: true,
    }),
    // 공통코드그룹 리로드 실패
    [POST_COMMONCODEGROUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commonCodeGroupDone: error,
    }),
  },
  initialState
);

export default cacheReload;
