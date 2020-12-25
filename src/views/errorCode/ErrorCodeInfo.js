import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeField,
  initializeForm,
  deleteErrorCode,
  putErrorCode,
} from "../../modules/errorCode/errorCode";
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

const ErrorCodeInfo = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, errorCodeList, deleteDone, updateDone } = useSelector(
    ({ errorCode }) => ({
      form: errorCode.update,
      errorCodeList: errorCode.errorCodeList,
      deleteDone: errorCode.deleteDone,
      updateDone: errorCode.updateDone,
    })
  );
  const errorCodeInfo = errorCodeList.find(
    (info) => info.errorCode.toString() === match.params.errorCodeId
  );
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // 에러 코드 삭제 dispatch 함수
  const onRemove = () => {
    console.log("에러 코드 삭제 dispatch");
    console.log("삭제할 ID : ", errorCodeInfo.errorCode);

    dispatch(deleteErrorCode(errorCodeInfo.errorCode));
  };

  // 에러 코드 수정 dispatch 함수
  const onUpdate = () => {
    console.log("에러 코드 수정 dispatch");

    const { message } = form;
    const id = errorCodeInfo.errorCode;
    console.log("message : ", message);
    console.log("id : ", id);
    // 하나라도 비어있다면
    if ([message].includes("")) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(putErrorCode({ id, message }));
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
    console.log("에러코드 인풋필드 초기화");
    dispatch(initializeForm("update"));
  }, [dispatch]);

  // 에러 코드 삭제 dispatch 이후
  useEffect(() => {
    if (deleteDone === null) return;

    if (deleteDone === true) {
      console.log("에러코드 삭제 성공!");
      history.push(`/errorCode/list`);
    } else if (deleteDone !== null && deleteDone !== true)
      console.log("에러코드 삭제 실패!");
  }, [deleteDone, history]);

  // 에러 코드 수정 dispatch 이루
  useEffect(() => {
    if (updateDone === null) return;

    if (updateDone === true) {
      console.log("에러코드 수정 성공!");
      history.push(`/errorCode/list`);
    } else if (updateDone !== null && updateDone !== true)
      console.log("에러코드 수정 실패!");
  }, [updateDone, history]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>에러 코드 정보 수정{" "}
            <small className="text-muted"> {match.params.errorCodeId}</small></CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>errorCode</td>
                  <td>
                    <strong>{errorCodeInfo.errorCode}</strong>
                  </td>
                </tr>
                <tr>
                  <td>errorMessage</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="message"
                      type="text"
                      defaultValue={errorCodeInfo.errorMessage}
                    />
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
            <ConfirmModal
              visible={editModal}
              title={"확인"}
              body={"에러 코드를 수정하시겠습니까?"}
              onConfirm={onUpdate}
              onCancel={closeEditModal}
              color={"info"}
            />
            <ConfirmModal
              visible={deleteModal}
              title={"확인"}
              body={"에러 코드를 삭제하시겠습니까?"}
              onConfirm={onRemove}
              onCancel={closeDeleteModal}
              color={"danger"}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ErrorCodeInfo;

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)
