import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as commonCodeAPI from "../../lib/api/commonCode";

// 코드 리스트 초기화
const INITIALIZE_CODELIST = "common/INITIALIZE_CODELIST";

// 카테고리 코드 리스트 정보 확인
const [
  GET_CATEGORYCODELIST,
  GET_CATEGORYCODELIST_SUCCESS,
  GET_CATEGORYCODELIST_FAILURE,
] = createRequestActionTypes("common/GET_CATEGORYCODELIST");

// 서브 카테고리 코드 리스트 정보 확인
const [
  GET_DETAILCODELIST,
  GET_DETAILCODELIST_SUCCESS,
  GET_DETAILCODELIST_FAILURE,
] = createRequestActionTypes("common/GET_DETAILCODELIST");

// 지역 코드 리스트 정보 확인
const [
  GET_AREACODELIST,
  GET_AREACODELIST_SUCCESS,
  GET_AREACODELIST_FAILURE,
] = createRequestActionTypes("common/GET_AREACODELIST");

export const getCategoryCodeList = createAction(
  GET_CATEGORYCODELIST,
  ({codeGroupId}) => ({codeGroupId})
);
export const getDetailCodeList = createAction(
  GET_DETAILCODELIST,
  ({codeGroupId, codeId}) => ({codeGroupId, codeId})
);
export const getAreaCodeList = createAction(
  GET_AREACODELIST,
  ({codeGroupId, codeId}) => ({codeGroupId, codeId})
);
export const initCodeList = createAction(INITIALIZE_CODELIST);

const getCategoryCodeListSaga = createRequestSaga(
  GET_CATEGORYCODELIST,
  commonCodeAPI.getCodeList
);
const getDetailCodeListSaga = createRequestSaga(
  GET_DETAILCODELIST,
  commonCodeAPI.getSubCodeList
);
const getAreaCodeListSaga = createRequestSaga(
  GET_AREACODELIST,
  commonCodeAPI.getSubCodeList
);

export function* codeSaga() {
  yield takeLatest(GET_CATEGORYCODELIST, getCategoryCodeListSaga);
  yield takeLatest(GET_DETAILCODELIST, getDetailCodeListSaga);
  yield takeLatest(GET_AREACODELIST, getAreaCodeListSaga);
}

const initialState = {
  categoryCode: null,
  detailCode: null,
  areaCode: null,
  initDone: null,
  getDone: null
};

const code = handleActions(
  {
    // 코드 리스트 초기화
    [INITIALIZE_CODELIST]: (state) => ({
      ...state,
      categoryCode: null,
      detailCode: null,
      areaCode: null,
      initDone: true,
      getDone: null
    }),
    // 카테고리 코드 리스트 조회 성공
    [GET_CATEGORYCODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      categoryCode: List,
      getDone: true
    }),
    // 카테고리 코드 리스트 조회 실패
    [GET_CATEGORYCODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error
    }),
    // 서브 카테고리 코드 리스트 조회 성공
    [GET_DETAILCODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      detailCode: List.subCodeList,
      getDone: true
    }),
    // 서브 카테고리 코드 리스트 조회 실패
    [GET_DETAILCODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error
    }),
    // 지역 코드 리스트 조회 성공
    [GET_AREACODELIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      areaCode: List.subCodeList,
      getDone: true
    }),
    // 지역 코드 리스트 조회 실패
    [GET_AREACODELIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error
    }),
  },
  initialState
);

export default code;
