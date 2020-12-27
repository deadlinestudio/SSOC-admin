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
  CSelect,
  CLabel,
} from "@coreui/react";

import { getSubCodeList, initCodeList } from "../../modules/commonCode/code";

const SubCodeList = ({ match }) => {
  const dispatch = useDispatch();
  const { subCodeList, initDone, getSubDone } = useSelector(({ code }) => ({
    subCodeList: code.subCodeList,
    initDone: code.initDone,
    getSubDone: code.getSubDone,
  }));
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const listSize = useRef(5);
  const [itemsPPg, setItemsPPg] = useState(5);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/commoncode/subcode/list/${match.params.codeGroupId}/${match.params.codeId}/?page=${newPage}`); // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
  };

  // 인풋 변경 이벤트 핸들러
  const onChangeItemsPPg = (e) => {
    const { value } = e.target;
    setItemsPPg(value);
  };

  const onButtonClick = () => {
    console.log("등록화면 이동");
    history.push(
      `/commoncode/subcode/register/${match.params.codeGroupId}/${match.params.codeId}`
    );
  };

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("user first rendering");
    dispatch(initCodeList());
  }, [dispatch]);

  // 코드 리스트 초기화 이후 렌더링 = 서브코드 리스트 dispatch
  useEffect(() => {
    if (initDone === null) return;
    console.log("get subcode list");
    dispatch(
      getSubCodeList({
        codeGroupId: match.params.codeGroupId,
        codeId: match.params.codeId,
      })
    );
  }, [dispatch, initDone, match.params.codeGroupId, match.params.codeId]);

  // 서브코드 리스트 가져온 후 렌더링
  useEffect(() => {
    if (getSubDone !== true) return;

    console.log("get subcode list success");
    console.log("getDone : ", getSubDone);
    if (subCodeList.length !== null && subCodeList.length!==0) listSize.current = subCodeList.length;
  }, [getSubDone, subCodeList]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage); // currentPage !== newPage 이면 setPage(currentPage)
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            서브 코드 목록
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
              items={subCodeList}
              fields={[
                { key: "codeDefinition", _classes: "font-weight-bold" },
                { key: "codeId" },
                { key: "createDateTime" },
                { key: "updateDateTime" },
              ]}
              hover
              striped
              itemsPerPage={Number(itemsPPg)}
              sorter
              columnFilter
              activePage={page}
              clickableRows
              onRowClick={(item) => {
                history.push(
                  `/commoncode/subcode/info/${item.codeGroupId}/${item.codeId}`
                );
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

export default SubCodeList;

/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/

/*
useState와 useRef 모두 상태관리를 위해 사용할 수 있습니다. 
다만 useState의 경우 state변화 후에 re-rendering을 진행하는 반면 useRef는 진행하지 않습니다. 
이러한 특성에 맞추어 렌더링이 필요한 state의 경우에는 useState를 사용하며 그렇지 않은 경우 useRef를 사용하는 것이 좋습니다.
*/
