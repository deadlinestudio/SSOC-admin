import React, { useState, useEffect, useRef} from "react";
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
} from "@coreui/react";
import {
  getMainCodeList,
  initCodeList,
} from "../../modules/commonCode/code";

const MainCodeList = ({match}) => {
  const dispatch = useDispatch();
  const { mainCodeList, initDone, getMainDone } = useSelector(({ code }) => ({
    mainCodeList: code.mainCodeList,
    initDone: code.initDone,
    getDone: code.getMainDone,
  }));
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const detail = useRef(false);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/commoncode/maincode/list/${match.params.id}/?page=${newPage}`); // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
  };

  const onButtonClick = () => {
    console.log("등록화면 이동");
    history.push(`/commoncode/maincode/register`);
  };

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("user first rendering");
    dispatch(initCodeList());
  }, [dispatch]);

  // 코드그룹 리스트 초기화 이후 렌더링 = 멤버리스트 dispatch
  useEffect(() => {
    if (initDone === null) return;
    console.log("get maincode list");
    dispatch(getMainCodeList({ codeGroupId: match.params.id }));
  }, [dispatch, initDone, match.params.id]);

  // 코드그룹 리스트 가져온 후 렌더링
  useEffect(() => {
    if (getMainDone !== true) return;

    console.log("get maincode list success");
    console.log("getDone : ", getMainDone);
  }, [getMainDone]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage); // currentPage !== newPage 이면 setPage(currentPage)
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            메인 코드 목록
            <small className="text-muted"> {match.params.id}</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={mainCodeList}
              fields={[
                { key: "codeDefinition", _classes: "font-weight-bold" },
                { key: "codeId" },
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
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => {
                  history.push(`/commoncode/maincode/info/${item.codeGroupId}`);
                  console.log(item);
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
                        서브코드
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

export default MainCodeList;

/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/

/*
useState와 useRef 모두 상태관리를 위해 사용할 수 있습니다. 
다만 useState의 경우 state변화 후에 re-rendering을 진행하는 반면 useRef는 진행하지 않습니다. 
이러한 특성에 맞추어 렌더링이 필요한 state의 경우에는 useState를 사용하며 그렇지 않은 경우 useRef를 사용하는 것이 좋습니다.
*/