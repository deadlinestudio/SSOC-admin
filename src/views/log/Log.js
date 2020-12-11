import React, { useEffect, useState } from "react";
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
import { AlertModal } from "../notification/modals/Modals";

const Log = () => {
  const dispatch = useDispatch();
  const { logContent, initDone, getDone } = useSelector(({ log }) => ({
    logContent: log.log,
    initDone: log.initDone,
    getDone: log.getDone,
  }));
  const [logModal, setLogModal] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 초기화
  useEffect(() => {
    console.log("로그 초기화 시작");
    dispatch(initLog());
  }, [dispatch]);

  // 초기화 후 렌더링
  useEffect(() => {
    if (initDone !== true) return;

    console.log("로그 초기화 끝");
  }, [initDone]);

  // 로그 가져온 후 렌더링
  useEffect(() => {
    if (getDone !== true) return;

    console.log("get log success");
    console.log("getDone : ", getDone);
    dispatch(initLog());
  }, [getDone, dispatch]);

  // 폼 등록 이벤트 핸들러
  const onSubmit = () => {
    const value = document.getElementById("date-input").value;
    if (value === "") openModal();
    else {
      const year = value.substring(0, 4);
      const month = value.substring(5, 7);
      const date = value.substring(8, 10);
      console.log("로그 api 호출", year, month, date);
      dispatch(getLog({ year, month, date }));
    }
  };

  // 경고 모달 열기
  const openModal = () => {
    console.log("경고 모달 열기");
    setLogModal(true);
  };

  // 경고 모달 종료
  const closeModal = () => {
    console.log("경고 모달 닫기");
    setLogModal(false);
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
                  value={logContent}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <AlertModal
          visible={logModal}
          title={"경고"}
          body={"날짜를 선택하여 주세요."}
          onCancel={closeModal}
        />
      </CCol>
    </CRow>
  );
};

export default Log;
