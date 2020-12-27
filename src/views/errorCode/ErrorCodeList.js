import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CLabel,
  CSelect,
} from "@coreui/react";

import {
  getErrorCodeList,
  initErrorCodeList,
} from "../../modules/errorCode/errorCode";

const ErrorCodeList = () => {
  const dispatch = useDispatch();
  const { errorCodeList, initDone, getDone } = useSelector(({ errorCode }) => ({
    errorCodeList: errorCode.errorCodeList,
    initDone: errorCode.initDone,
    getDone: errorCode.getDone,
  }));
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const listSize = useRef(5);
  const [itemsPPg, setItemsPPg] = useState(5);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/errorcode/list?page=${newPage}`); // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
  };

  // 인풋 변경 이벤트 핸들러
  const onChangeItemsPPg = (e) => {
    const { value } = e.target;
    setItemsPPg(value);
  };

  const onButtonClick = () => {
    console.log("등록화면 이동");
    history.push(`/errorcode/register`);
  };

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("user first rendering");
    dispatch(initErrorCodeList());
  }, [dispatch]);

  // 에러코드 목록 초기화 이후 렌더링 = 에러코드 dispatch
  useEffect(() => {
    if (initDone === null) return;
    console.log("get codegrouplist");
    dispatch(getErrorCodeList());
  }, [dispatch, initDone]);

  // 에러코드 리스트 가져온 후 렌더링
  useEffect(() => {
    if (getDone !== true) return;
    console.log("get errorcodelist success");
    console.log("getDone : ", getDone);
    if (errorCodeList.length !== null) listSize.current = errorCodeList.length;
  }, [getDone, errorCodeList]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage); // currentPage !== newPage 이면 setPage(currentPage)
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            에러 코드 목록
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            <CRow className="row no-gutters">
              <CCol md="11">
                <CLabel className="d-flex justify-content-end">
                  Items per page : &nbsp;
                </CLabel>
              </CCol>
              <div></div>
              <CCol md="1">
                <CSelect
                  onChange={onChangeItemsPPg}
                  name="itemsPPg"
                  type="text"
                  size="sm"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </CSelect>
              </CCol>
            </CRow>
            <CDataTable
              items={errorCodeList}
              fields={[
                { key: "errorCode", _classes: "font-weight-bold" },
                "errorMessage",
              ]}
              hover
              striped
              itemsPerPage={Number(itemsPPg)}
              sorter
              columnFilter
              activePage={page}
              clickableRows
              onRowClick={(item) => {
                // (item, key) 를 넣고 key로 넘길 수 있음
                history.push(`/errorcode/info/${item.errorCode}`);
                console.log(item);
              }}
            />
            <CButton color="success" onClick={onButtonClick}>
              등록
            </CButton>
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              doubleArrows={false}
              align="center"
              pages={
                listSize.current % itemsPPg === 0
                  ? listSize.current / itemsPPg
                  : listSize.current / itemsPPg + 1
              }
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ErrorCodeList;

/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/
