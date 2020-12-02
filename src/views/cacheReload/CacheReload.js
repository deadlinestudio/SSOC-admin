import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCardGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CLabel,
  CRow,
  CCol,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const CacheReload = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone } = useSelector(({ codeGroup }) => ({
    form: codeGroup.register,
    registerDone: codeGroup.registerDone,
    regInitDone: codeGroup.regInitDone,
  }));

  // 폼 등록 이벤트 핸들러
  const onCommonCodeSummit = (e) => {
    e.preventDefault();

    console.log("공통코드 리로드");
  };

  // 폼 등록 이벤트 핸들러
  const onCommonCodeGroupSummit = (e) => {
    e.preventDefault();

    console.log("공통코드그룹 리로드");
  };

  // 폼 등록 이벤트 핸들러
  const onErrorCodeSummit = (e) => {
    e.preventDefault();

    console.log("에러코드 리로드");
  };

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCardGroup columns className="cols-1">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CCardHeader>
                <h3>Cache Reload</h3>
                <p className="text-muted">Reoload your Cache</p>
              </CCardHeader>
              <CListGroup>
                <CListGroupItem>
                    <CLabel sm="10" col>
                      <strong>공통코드 리로드</strong>
                    </CLabel>
                    <CButton onClick={onCommonCodeSummit} color="success">
                      반영
                    </CButton>
                </CListGroupItem>
                <CListGroupItem>
                  <CLabel sm="10" col>
                    <strong>공통코드그룹 리로드</strong>
                  </CLabel>
                    <CButton onClick={onCommonCodeGroupSummit} color="success">
                      반영
                    </CButton>
                </CListGroupItem>
                <CListGroupItem>
                  <CLabel sm="10" col>
                    <strong>에러코드 리로드</strong>
                  </CLabel>
                    <CButton onClick={onErrorCodeSummit} color="success">
                      반영
                    </CButton>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  );
};

export default CacheReload;
// ["xs","sm","md","lg","xl"]
