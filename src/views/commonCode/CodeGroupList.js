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

import {
  getCodeGroupList,
  initCodeGroupList,
} from "../../modules/commonCode/codeGroup";

const CodeGroupList = () => {
  const dispatch = useDispatch();
  const { codeGroupList, initDone, getDone } = useSelector(({ codeGroup }) => ({
    codeGroupList: codeGroup.codeGroupList,
    initDone: codeGroup.initDone,
    getDone: codeGroup.getDone,
  }));
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const detail = useRef(false);
  const listSize = useRef(5);
  const [itemsPPg, setItemsPPg] = useState(5);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/commoncode/codegroup/list?page=${newPage}`); // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
  };

  // 인풋 변경 이벤트 핸들러
  const onChangeItemsPPg = (e) => {
    const { value } = e.target;
    setItemsPPg(value);
  };

  const onButtonClick = () => {
    console.log("등록화면 이동");
    history.push(`/commoncode/codegroup/register`);
  };

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("user first rendering");
    detail.current = false;
    dispatch(initCodeGroupList());
  }, [dispatch]);

  // 코드그룹 리스트 초기화 이후 렌더링 = 멤버리스트 dispatch
  useEffect(() => {
    if (initDone === null) return;
    console.log("get codegrouplist");
    dispatch(getCodeGroupList());
  }, [dispatch, initDone]);

  // 코드그룹 리스트 가져온 후 렌더링
  useEffect(() => {
    if (getDone !== true) return;

    console.log("get codegrouplist success");
    if (codeGroupList.length !== null) listSize.current = codeGroupList.length;
    console.log("codeGroupList.length : ", listSize.current);
  }, [getDone, codeGroupList]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage); // currentPage !== newPage 이면 setPage(currentPage)
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            공통 코드 그룹 목록
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
              items={codeGroupList}
              fields={[
                { key: "codeGroupId", _classes: "font-weight-bold" },
                { key: "codeGroupDefinition" },
                { key: "createDateTime" },
                { key: "updateDateTime" },
                {
                  key: "show_details",
                  label: "",
                  sorter: false,
                  filter: false,
                },
              ]}
              hover
              striped
              itemsPerPage={Number(itemsPPg)}
              sorter
              columnFilter
              activePage={page}
              clickableRows
              onRowClick={(item) => {
                if (detail.current === false) {
                  history.push(
                    `/commoncode/codegroup/info/${item.codeGroupId}`
                  );
                  console.log(item);
                } else {
                  console.log("상세코드 버튼 눌름");
                }
              }}
              scopedSlots={{
                show_details: (item, i) => {
                  return (
                    <td>
                      <CButton
                        size="sm"
                        color="primary"
                        onClick={() => {
                          detail.current = true;
                          history.push(
                            `/commoncode/maincode/list/${item.codeGroupId}`
                          );
                        }}
                      >
                        메인코드
                      </CButton>
                    </td>
                  );
                },
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

export default CodeGroupList;

/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/

/*
useState와 useRef 모두 상태관리를 위해 사용할 수 있습니다. 
다만 useState의 경우 state변화 후에 re-rendering을 진행하는 반면 useRef는 진행하지 않습니다. 
이러한 특성에 맞추어 렌더링이 필요한 state의 경우에는 useState를 사용하며 그렇지 않은 경우 useRef를 사용하는 것이 좋습니다.
*/
