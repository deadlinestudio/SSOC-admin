import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initCacheList,
  postCommonCode,
  postCommonCodeGroup,
} from "../../modules/cacheReload/cacheReload";
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

const CacheReload = () => {
  const dispatch = useDispatch();
  const { commonCodeDone, commonCodeGroupDone } = useSelector(
    ({ cacheReload }) => ({
      commonCodeDone: cacheReload.commonCodeDone,
      commonCodeGroupDone: cacheReload.commonCodeGroupDone,
    })
  );

  // 공통코드 캐시 리로드 후 렌더링
  useEffect(() => {
    if (commonCodeDone === null) return;

    if (commonCodeDone === true) {
      console.log("공통코드 캐시 리로드 완료");
      dispatch(initCacheList());
    } else if (commonCodeDone !== null)
      console.log("공통코드 캐시 리로드 실패");

    dispatch(initCacheList());
  }, [dispatch, commonCodeDone]);

  // 공통코드그룹 캐시 리로드 후 렌더링
  useEffect(() => {
    if (commonCodeGroupDone === null) return;

    if (commonCodeGroupDone === true) {
      console.log("공통코드그룹 캐시 리로드 완료");
      dispatch(initCacheList());
    } else if (commonCodeGroupDone !== null)
      console.log("공통코드그룹 캐시 리로드 실패");
  }, [dispatch, commonCodeGroupDone]);

  // 폼 등록 이벤트 핸들러 
  const onCommonCodeSummit = (e) => {
    e.preventDefault();

    console.log("공통코드 리로드");
    dispatch(postCommonCode());
  };

  // 폼 등록 이벤트 핸들러
  const onCommonCodeGroupSummit = (e) => {
    e.preventDefault();

    console.log("공통코드그룹 리로드");
    dispatch(postCommonCodeGroup());
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
