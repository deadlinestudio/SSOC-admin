import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CInput,
  CCol,
  CRow,
  CTextarea,
} from "@coreui/react";

import { getLog, initLog } from "../../modules/log/log";

const Log = () => {
  const dispatch = useDispatch();
  const { logContent, initDone, getDone } = useSelector(({ log }) => ({
    logContent: log.log,
    initDone: log.initDone,
    getDone: log.getDone,
  }));

  // 컴포넌트가 처음 렌더링될 때 초기화
  useEffect(() => {
    console.log("로그 초기화");
    dispatch(initLog());
  }, [dispatch]);

  // 로그 가져온 후 렌더링
  useEffect(() => {
    if (getDone !== true) return;

    console.log("get log success");
    console.log("getDone : ", getDone);
    dispatch(initLog());
  },[getDone,dispatch]);

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();

    const value = document.getElementById("date-input").value;
    if (value === "") console.log("날짜를 선택하세요");
    else{
      const year = value.substring(0,4);
      const month = value.substring(5,7);
      const date = value.substring(8,10);
      console.log("로그 api 호출", year,month,date);
      dispatch(getLog({year, month, date}));
    } 
  };

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <h3>Log Check</h3>
            <p className="text-muted">Choose a date</p>
            <CRow>
              <CCol xl="8">
                <CInput
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                />
              </CCol>
              <CCol xl="4">
                <CButton color="success" onClick={onSubmit} block>
                  Check
                </CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="15"
                  value = {logContent}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Log;
