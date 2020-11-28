import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as authAPI from "../../lib/api/auth";

// 클럽리스트 초기화
const INITIALIZE_CLUBLIST = "club/INITIALIZE_CLUBLIST";

// 클럽리스트 정보 확인
const [
  GET_CLUBLIST,
  GET_CLUBLIST_SUCCESS,
  GET_CLUBLIST_FAILURE,
] = createRequestActionTypes("club/GET_CLUBLIST");

// 클럽 추가
const [
  POST_CLUB,
  POST_CLUB_SUCCESS,
  POST_CLUB_FAILURE,
] = createRequestActionTypes("club/POST_CLUB");

// 클럽 삭제
const [
  DELETE_CLUB,
  DELETE_CLUB_SUCCESS,
  DELETE_CLUB_FAILURE,
] = createRequestActionTypes("club/DELETE_CLUB");

// 클럽 수정
const [PUT_CLUB, PUT_CLUB_SUCCESS, PUT_CLUB_FAILURE] = createRequestActionTypes(
  "club/PUT_CLUB"
);

const CHANGE_FIELD = "club/CHANGE_FIELD";
const INITIALIZE_FORM = "club/INITIAL_FROM";

export const getClubList = createAction(GET_CLUBLIST);
export const initClubList = createAction(INITIALIZE_CLUBLIST);
export const postClub = createAction(
  POST_CLUB,
  ({
    areaCode,
    body,
    capacity,
    categoryCode,
    detailCategoryCode,
    ownerMemberId,
    privateFlag,
    title,
  }) => ({
    areaCode,
    body,
    capacity,
    categoryCode,
    detailCategoryCode,
    ownerMemberId,
    privateFlag,
    title,
  })
);
export const deleteClub = createAction(DELETE_CLUB, (id) => id);
export const putClub = createAction(
  PUT_CLUB,
  ({
    id,
    areaCode,
    body,
    capacity,
    categoryCode,
    detailCategoryCode,
    modifierId,
    privateFlag,
  }) => ({
    id,
    areaCode,
    body,
    capacity,
    categoryCode,
    detailCategoryCode,
    modifierId,
    privateFlag,
  })
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
const getClubListSaga = createRequestSaga(GET_CLUBLIST, authAPI.getClubList);
const postClubSaga = createRequestSaga(
  POST_CLUB,
  authAPI.postClub
);
const deleteClubSaga = createRequestSaga(
  DELETE_CLUB,
  authAPI.deleteClub
);
const putClubSaga = createRequestSaga(PUT_CLUB, authAPI.putClub);


export function* clubSaga() {
  yield takeLatest(GET_CLUBLIST, getClubListSaga);
  yield takeLatest(POST_CLUB, postClubSaga);
  yield takeLatest(DELETE_CLUB, deleteClubSaga);
  yield takeLatest(PUT_CLUB, putClubSaga);
}

const initialState = {
  register: {
    id : "",
    areaCode : "",
    body : "",
    capacity : "",
    categoryCode : "",
    detailCategoryCode : "",
    modifierId : "",
    privateFlag : "",
  },
  update:{
    areaCode : "",
    body : "",
    capacity : "",
    categoryCode : "",
    detailCategoryCode : "",
    modifierId : "",
    privateFlag : ""
  },
  clubList: null,
  initDone: null,
  getDone: null,
  registerDone: null,
  regInitDone: null,
  deleteDone: null,
  updateDone: null,
};

const club = handleActions(
  {
    // 클럽리스트 초기화
    [INITIALIZE_CLUBLIST]: (state) => ({
      ...state,
      clubList: null,
      initDone: true,
      getDone: null,
      registerDone: null,
      regInitDone: null,
      deleteDone: null,
      updateDone: null,
    }),
    // 클럽리스트 조회 성공
    [GET_CLUBLIST_SUCCESS]: (state, { payload: List }) => ({
      ...state,
      clubList: List,
      getDone: true,
    }),
    // 클럽리스트 조회 실패
    [GET_CLUBLIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getDone: error,
    }),
    // 클럽 인풋 초기화
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      registerDone: null,
      regInitDone: true,
    }),
    // 클럽 인풋 수정
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    // 클럽 등록 성공
    [POST_CLUB_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      registerDone: true,
    }),
    // 클럽 등록 실패
    [POST_CLUB_FAILURE]: (state, { payload: error }) => ({
      ...state,
      registerDone: error,
    }),
    // 클럽 삭제 성공
    [DELETE_CLUB_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      deleteDone: true,
    }),
    // 클럽 삭제 실패
    [DELETE_CLUB_FAILURE]: (state, { payload: error }) => ({
      ...state,
      deleteDone: error,
    }),
    // 클럽 수정 성공
    [PUT_CLUB_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      updateDone: true,
    }),
    // 클럽 수정 실패
    [PUT_CLUB_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateDone: error,
    }),
  },
  initialState
);

export default club;
