import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeField,
  initializeForm,
  deleteCode,
  putCode,
} from "../../modules/commonCode/code";
import { ConfirmModal } from "../notification/modals/Modals";
import {
  CInput,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

const MainCodeInfo = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, mainCodeList, deleteDone, updateDone } = useSelector(
    ({ code }) => ({
      form: code.update,
      mainCodeList: code.mainCodeList,
      deleteDone: code.deleteDone,
      updateDone: code.updateDone,
    })
  );

  const codeInfo = mainCodeList.find(
    (info) => info.codeId.toString() === match.params.codeId
  );
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // 코드 삭제 dispatch 함수
  const onRemove = () => {
    console.log("코드 그룹 삭제 dispatch");
    console.log("삭제할 ID : ", codeInfo.codeGroupId);

    dispatch(
      deleteCode({ codeGroupId: codeInfo.codeGroupId, codeId: codeInfo.codeId })
    );
  };

  // 코드 수정 dispatch 함수
  const onUpdate = () => {
    console.log("코드 그룹 수정 dispatch");

    const { definition } = form;
    const id = codeInfo.codeGroupId;
    console.log("definition : ", definition);
    console.log("id : ", id);
    // 하나라도 비어있다면
    if ([definition].includes("")) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(
      putCode({
        codeGroupId: codeInfo.codeGroupId,
        codeId: codeInfo.codeId,
        definition: definition,
      })
    );
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

  // 수정 확인 모달 열기
  const openEditModal = () => {
    console.log("수정 확인 모달 열기");
    setEditModal(true);
  };

  // 수정 확인 모달 종료
  const closeEditModal = () => {
    console.log("수정 확인 모달 닫기");
    setEditModal(false);
  };

  // 삭제 확인 모달 열기
  const openDeleteModal = () => {
    console.log("삭제 확인 모달 열기");
    setDeleteModal(true);
  };

  // 삭제 확인 모달 종료
  const closeDeleteModal = () => {
    console.log("삭제 확인 모달 닫기");
    setDeleteModal(false);
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("공통코드 인풋필드 초기화");
    dispatch(initializeForm("update"));
  }, [dispatch]);

  // 코드 삭제 dispatch 이후
  useEffect(() => {
    if (deleteDone === null) return;

    if (deleteDone === true) {
      console.log("코드 삭제 성공!");
      history.push(`/commoncode/maincode/list/${match.params.codeGroupId}`);
    } else if (deleteDone !== null && deleteDone !== true)
      console.log("코드 삭제 실패!");
  }, [deleteDone, history, match.params.codeGroupId]);

  // 코드 수정 dispatch 이루
  useEffect(() => {
    if (updateDone === null) return;

    if (updateDone === true) {
      console.log("코드 수정 성공!");
      history.push(`/commoncode/maincode/list/${match.params.codeGroupId}`);
    } else if (updateDone !== null && updateDone !== true)
      console.log("코드 수정 실패!");
  }, [updateDone, history, match.params.codeGroupId]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            메인 코드 정보 수정{" "}
            <small className="text-muted"> {match.params.codeGroupId}</small>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>codeGroupId</td>
                  <td>
                    <strong>{codeInfo.codeGroupId}</strong>
                  </td>
                </tr>
                <tr>
                  <td>codeId</td>
                  <td>
                    <strong>{codeInfo.codeId}</strong>
                  </td>
                </tr>
                <tr>
                  <td>codeGroupDefinition</td>
                  <td>
                    <strong>{codeInfo.codeGroupDefinition}</strong>
                  </td>
                </tr>
                <tr>
                  <td>codeDefinition</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="definition"
                      type="text"
                      defaultValue={codeInfo.codeDefinition}
                    />
                  </td>
                </tr>
                <tr>
                  <td>createDateTime</td>
                  <td>
                    <strong>{codeInfo.createDateTime}</strong>
                  </td>
                </tr>
                <tr>
                  <td>updateDateTime</td>
                  <td>
                    <strong>{codeInfo.updateDateTime}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <CButton onClick={openDeleteModal} color="danger">
              삭제
            </CButton>
            <CButton onClick={openEditModal} color="info">
              수정
            </CButton>
          </CCardBody>
          <ConfirmModal
            visible={editModal}
            title={"확인"}
            body={"메인코드를 수정하시겠습니까?"}
            onConfirm={onUpdate}
            onCancel={closeEditModal}
            color={"info"}
          />
          <ConfirmModal
            visible={deleteModal}
            title={"확인"}
            body={"메인코드를 삭제하시겠습니까?"}
            onConfirm={onRemove}
            onCancel={closeDeleteModal}
            color={"danger"}
          />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MainCodeInfo;

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)
