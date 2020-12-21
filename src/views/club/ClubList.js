import React, { useState, useEffect } from "react";
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
  CButton,
} from "@coreui/react";

import { initClubList, getClubList } from "../../modules/club/club";

const getBadge = (status) => {
  switch (status) {
    case "10":
      return "success";
    case "20":
      return "secondary";
    case "30":
      return "warning";
    case "40":
      return "danger";
    default:
      return "primary";
  }
};

const ClubList = () => {
  const dispatch = useDispatch();
  const { clubList, initDone, getDone } = useSelector(({ club }) => ({
    clubList: club.clubList,
    initDone: club.initDone,
    getDone: club.getDone,
  }));
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/club/list?page=${newPage}`); // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
  };

  const onButtonClick = ()=>{
    console.log("등록화면 이동");
    history.push(`/club/register`);
  }

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("user first rendering");
    dispatch(initClubList());
  }, [dispatch]);

  // 클럽리스트 초기화 이후 렌더링 = 클럽리스트 dispatch
  useEffect(() => {
    if (initDone === null) return;
    console.log("get clublist");
    dispatch(getClubList());
  }, [dispatch, initDone]);

  // 클럽리스트 가져온 후 렌더링
  useEffect(() => {
    if (getDone !== true) return;

    console.log("get clublist success");
    console.log("getDone : ", getDone);
  });

  useEffect(() => {
    currentPage !== page && setPage(currentPage); // currentPage !== newPage 이면 setPage(currentPage)
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            클럽목록
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={clubList}
              fields={[
                { key: "title", _classes: "font-weight-bold" },
                "body",
                "category",
                "statusCode",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => {
                history.push(`/club/info/${item.id}`);
                console.log(item);
              }}
              scopedSlots={{
                statusCode: (item) => (
                  <td>
                    <CBadge color={getBadge(item.statusCode)}>
                      {item.statusCode === "10"
                        ? "활성화"
                        : item.statusCode === "20"
                        ? "몰라"
                        : "더 몰라"}
                    </CBadge>
                  </td>
                ),
              }}
            />
            <CButton color="success" onClick={onButtonClick}>등록</CButton>
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ClubList;

/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/
