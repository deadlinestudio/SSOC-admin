import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import member, { memberSaga } from "./member/member";
import club, { clubSaga } from "./club/club";
import codeGroup, { codeGroupSaga } from "./commonCode/codeGroup";
import code, {codeSaga} from "./commonCode/code";
import errorCode, { errorCodeSaga } from "./errorCode/errorCode";
import cacheReload, {cacheReloadSaga } from "./cacheReload/cacheReload";
import log, {logSaga} from "./log/log";
import chart, {chartSaga} from "./chart/chart"
import loading from "./loading";
import sideBarShow from "./sideBarShow";

const rootReducer = combineReducers({
  loading,
  member,
  club,
  codeGroup,
  code,
  errorCode,
  cacheReload,
  log,
  chart,
  sideBarShow,
});

export function* rootSaga() {
  yield all([memberSaga(), clubSaga(), codeGroupSaga(), codeSaga(), errorCodeSaga(), cacheReloadSaga(), logSaga(), chartSaga()]);
}

export default rootReducer;
