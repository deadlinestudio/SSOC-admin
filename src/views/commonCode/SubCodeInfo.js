import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeField,
  initializeForm,
  deleteCodeGroup,
  putCodeGroup,
} from "../../modules/commonCode/codeGroup";
import {
  CInput,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

const SubCodeInfo = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, codeGroupList, deleteDone, updateDone } = useSelector(
    ({ codeGroup }) => ({
      form: codeGroup.update,
      codeGroupList: codeGroup.codeGroupList,
      deleteDone: codeGroup.deleteDone,
      updateDone: codeGroup.updateDone,
    })
  );

  const codeGroupInfo = codeGroupList.find(
    (info) => info.codeGroupId.toString() === match.params.id
  );
  // const CodeGroupDetail = codeGroupInfo
  //   ? Object.entries(codeGroupInfo)
  //   : [
  //       [
  //         "id",
  //         <span>
  //           <CIcon className="text-muted" name="cui-icon-ban" /> Not found
  //         </span>,
  //       ],
  //     ];

  // 코드 그룹 삭제 dispatch 함수
  const onRemove = () => {
    console.log("코드 그룹 삭제 dispatch");
    console.log("삭제할 ID : ", codeGroupInfo.codeGroupId);

    dispatch(deleteCodeGroup(codeGroupInfo.codeGroupId));
  };

  // 코드 그룹 수정 dispatch 함수
  const onUpdate = () => {
    console.log("코드 그룹 수정 dispatch");

    const { definition } = form;
    const id = codeGroupInfo.codeGroupId;
    console.log("definition : ", definition);
    console.log("id : ", id);
    // 하나라도 비어있다면
    if ([definition].includes("")) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(putCodeGroup({ id, definition }));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "update",
        key: name,
        value,
      })
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("공통코드 인풋필드 초기화");
    dispatch(initializeForm("update"));
  }, [dispatch]);

  // 코드 그룹 삭제 dispatch 이후
  useEffect(() => {
    if (deleteDone === null) return;

    if (deleteDone === true) {
      console.log("코드그룹 삭제 성공!");
      history.push(`/commoncode/codegroup/list`);
    } else if (deleteDone !== null && deleteDone !== true)
      console.log("코드그룹 삭제 실패!");
  }, [deleteDone, history]);

  // 코드 그룹 수정 dispatch 이루
  useEffect(() => {
    if (updateDone === null) return;

    if (updateDone === true) {
      console.log("코드그룹 수정 성공!");
      history.push(`/commoncode/codegroup/list`);
    } else if (updateDone !== null && updateDone !== true)
      console.log("코드그룹 수정 실패!");
  }, [updateDone, history]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>CodeGroup ID: {match.params.id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {/* {CodeGroupDetail.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>
                        {key === "codeGroupDefinition" ? (
                          <CInput
                            onChange={onChange}
                            name="definition"
                            type="text"
                            placeholder={key.toString()}
                            defaultValue={value}
                          />
                        ) : (
                          <strong>{value}</strong>
                        )}
                      </td>
                    </tr>
                  );
                })} */}
                <tr>
                  <td>codeGroupId</td>
                  <td>
                    <strong>{codeGroupInfo.codeGroupId}</strong>
                  </td>
                </tr>
                <tr>
                  <td>codeGroupDefinition</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="definition"
                      type="text"
                      defaultValue={codeGroupInfo.codeGroupDefinition}
                    />
                  </td>
                </tr>
                <tr>
                  <td>createDateTime</td>
                  <td>
                    <strong>{codeGroupInfo.createDateTime}</strong>
                  </td>
                </tr>
                <tr>
                  <td>updateDateTime</td>
                  <td>
                    <strong>{codeGroupInfo.updateDateTime}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <CButton onClick={onRemove} color="danger">
              삭제
            </CButton>
            <CButton onClick={onUpdate} color="info">
              수정
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SubCodeInfo;

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)
