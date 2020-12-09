import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initCacheList,
  postCommonCode,
  postCommonCodeGroup,
} from "../../modules/cacheReload/cacheReload";
import {
  CButton,
  CCardGroup,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CLabel,
  CRow,
  CCol,
} from "@coreui/react";
import ConfirmModal from "../notification/modals/ConfirmModal";

const CacheReload = () => {
  const dispatch = useDispatch();
  const { cmnCdDone, cmnCdGrpDone } = useSelector(({ cacheReload }) => ({
    cmnCdDone: cacheReload.commonCodeDone,
    cmnCdGrpDone: cacheReload.commonCodeGroupDone,
  }));
  const [errorCdModal, setErrorCdModal] = useState(false);
  const [cmnCdModal, setCmnCdModal] = useState(false);
  const [cmnCdGrpModal, setCmnCdGrpModal] = useState(false);

  // 공통코드 캐시 리로드 후 렌더링
  useEffect(() => {
    if (cmnCdDone === null) return;

    if (cmnCdDone === true) {
      console.log("공통코드 캐시 리로드 완료");
      dispatch(initCacheList());
    } else if (cmnCdDone !== null) console.log("공통코드 캐시 리로드 실패");

    dispatch(initCacheList());
  }, [dispatch, cmnCdDone]);

  // 공통코드그룹 캐시 리로드 후 렌더링
  useEffect(() => {
    if (cmnCdGrpDone === null) return;

    if (cmnCdGrpDone === true) {
      //console.log("공통코드그룹 캐시 리로드 완료");
      dispatch(initCacheList());
    } else if (cmnCdGrpDone !== null)
      console.log("공통코드그룹 캐시 리로드 실패");
  }, [dispatch, cmnCdGrpDone]);

  // 공통코드 리로드 이벤트 핸들러
  const onCmnCdSummit = (e) => {
    e.preventDefault();

    console.log("공통코드 리로드");
    dispatch(postCommonCode());
    onCmnCdCancelClick();
  };

  // 공통코드구룹 리로드 이벤트 핸들러
  const onCmnCdGrpSummit = (e) => {
    e.preventDefault();

    console.log("공통코드그룹 리로드");
    dispatch(postCommonCodeGroup());
    onCmnCdGrpCancelClick();
  };

  // 에러코드 리로드 이벤트 핸들러
  const onErrorCdSummit = (e) => {
    e.preventDefault();
    onErrorCancelClick();
    console.log("에러코드 리로드");
  };

  // 공통코드 리로드 클릭
  const onCmnCdClick = () => {
    console.log("공통코드 리로드 버튼 클릭");
    setCmnCdModal(true);
  };

  // 공통코드그룹 리로드 클릭
  const onCmnCdGrpClick = () => {
    console.log("공통코드그룹 리로드 버튼 클릭");
    setCmnCdGrpModal(true);
  };

  // 에러코드 리로드 클릭
  const onErrorCdClick = () => {
    console.log("에러코드 리로드 버튼 클릭");
    setErrorCdModal(true);
  };

  // 공통코드 모달 취소 클릭
  const onCmnCdCancelClick = () => {
    console.log("공통코드 모달 종료");
    setCmnCdModal(false);
  };

  // 공통코드그룹 모달 취소 클릭
  const onCmnCdGrpCancelClick = () => {
    console.log("공통코드그룹 모달 종료");
    setCmnCdGrpModal(false);
  };

  // 에러코드 모달 취소 클릭
  const onErrorCancelClick = () => {
    console.log("에러코드 모달 종료");
    setErrorCdModal(false);
  };

  return (
    <CRow>
      <CCol sm="12" xl="6">
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
                <CButton onClick={onCmnCdClick} color="success" block>
                  반영
                </CButton>
              </CListGroupItem>
              <CListGroupItem>
                <CLabel sm="10" col>
                  <strong>공통코드그룹 리로드</strong>
                </CLabel>
                <CButton onClick={onCmnCdGrpClick} color="success" block>
                  반영
                </CButton>
              </CListGroupItem>
              <CListGroupItem>
                <CLabel sm="10" col>
                  <strong>에러코드 리로드</strong>
                </CLabel>
                <CButton onClick={onErrorCdClick} color="success" block>
                  반영
                </CButton>
              </CListGroupItem>
            </CListGroup>
            <ConfirmModal
              visible={cmnCdModal}
              title={"확인"}
              body={"공통코드를 리로드 하시겠습니까?"}
              onConfirm={onCmnCdSummit}
              onCancel={onCmnCdCancelClick}
            />
            <ConfirmModal
              visible={cmnCdGrpModal}
              title={"확인"}
              body={"공통코드그룹을 리로드 하시겠습니까?"}
              onConfirm={onCmnCdGrpSummit}
              onCancel={onCmnCdGrpCancelClick}
            />
            <ConfirmModal
              visible={errorCdModal}
              title={"확인"}
              body={"에러코드를 리로드 하시겠습니까?"}
              onConfirm={onErrorCdSummit}
              onCancel={onErrorCancelClick}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CacheReload;
// ["xs","sm","md","lg","xl"]
