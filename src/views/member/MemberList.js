import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CSelect,
  CLabel,
} from "@coreui/react";

import { initMemberList, getMemberList } from "../../modules/member/member";

const getBadge = (status) => {
  switch (status) {
    case "10":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "40":
      return "danger";
    default:
      return "primary";
  }
};

const MemberList = () => {
  const dispatch = useDispatch();
  const { memberList, initDone, getDone } = useSelector(({ member }) => ({
    memberList: member.memberList,
    initDone: member.initDone,
    getDone: member.getDone,
  }));
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const listSize = useRef(3);
  const [itemsPPg,setItemsPPg] = useState(5);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/member/list?page=${newPage}`); // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
  };

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value } = e.target;
    console.log("e : ",e.target);
    console.log(value);
    setItemsPPg(value);
  };

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("user first rendering");
    dispatch(initMemberList());
  }, [dispatch]);

  // 멤버리스트 초기화 이후 렌더링 = 멤버리스트 dispatch
  useEffect(() => {
    if (initDone === null) return;
    console.log("get memberlist start");
    dispatch(getMemberList());
    console.log("get memberlist end");
  }, [dispatch, initDone]);

  // 멤버리스트 리스트 가져온 후 렌더링
  useEffect(() => {
    if (getDone !== true) return;

    console.log("get memberlist success");
    console.log("getDone : ", getDone);
    if (memberList.length !== null) listSize.current = memberList.length;
  }, [getDone, memberList]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage); // currentPage !== newPage 이면 setPage(currentPage)
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            회원목록
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
                  onChange={onChange}
                  name="itemsPPg"
                  type="text"
                  placeholder="Area Code"
                  autoComplete="areaCode"
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
              id="data-table"
              items={memberList}
              fields={[
                { key: "username", _classes: "font-weight-bold" },
                "email",
                "birthDay",
                "gender",
                "area",
                "signUpDateTime",
                "statusCode",
              ]}
              hover
              striped
              itemsPerPage={itemsPPg}
              sorter
              columnFilter
              activePage={page}
              clickableRows
              onRowClick={(item) => {
                //history.push(`/users/${item.id}`)
                console.log(item);
              }}
              scopedSlots={{
                statusCode: (item) => (
                  <td>
                    <CBadge color={getBadge(item.statusCode)}>
                      {item.statusCode === "10"
                        ? "정상"
                        : item.statusCode === "40"
                        ? "정지"
                        : "몰라"}
                    </CBadge>
                  </td>
                ),
              }}
            />
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

export default MemberList;

/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/
