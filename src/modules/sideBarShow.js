import { createAction, handleActions } from "redux-actions";

const CHANGE_SIDEBARSHOW = "sidebar/CHANGE_SIDEBARSHOW";

export const change_sidebarshow = createAction(
  CHANGE_SIDEBARSHOW,
  (val) => val
);

const initialState = {
  sidebarShow: "responsive",
};

const sideBarShow = handleActions(
  {
    [CHANGE_SIDEBARSHOW]: (state, { payload: val }) => ({
      ...state,
      sidebarShow: val,
    }),
  },
  initialState
);

export default sideBarShow;
