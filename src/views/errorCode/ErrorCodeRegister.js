import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  postErrorCode,
  initializeForm,
} from "../../modules/errorCode/errorCode";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CInput,
  CRow,
  CCol,
  CFormGroup,
  CCardHeader,
  CLabel
} from "@coreui/react";
import { ConfirmModal } from "../notification/modals/Modals";

const ErrorCodeRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, registerDone, regInitDone } = useSelector(({ errorCode }) => ({
    form: errorCode.register,
    registerDone: errorCode.registerDone,
    regInitDone: errorCode.regInitDone,
  }));
  const [modal, setModal] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("에러코드 인풋필드 초기화");
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 에러코드 성공/실패 처리
  useEffect(() => {
    if (regInitDone === null) return;

    if (registerDone === true) {
      console.log(registerDone);
      console.log("에러코드 등록 성공!");
      dispatch(initializeForm("register"));
      history.push(`/errorCode/list`);
    } else if (registerDone !== true && registerDone !== null) {
      console.log(registerDone);
      console.log("에러코드 등록 실패!");
    }
  }, [registerDone, regInitDone, dispatch, history]);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();

    const { id, message } = form;
    // 하나라도 비어있다면
    if ([id, message].includes("")) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(postErrorCode({ id, message }));
  };

  // 확인 모달 열기
  const openModal = () => {
    console.log("확인 모달 열기");
    setModal(true);
  };

  // 확인 모달 종료
  const closeModal = () => {
    console.log("확인 모달 닫기");
    setModal(false);
  };

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            <h4>ErrorCode Register</h4>
            <small>Create your ErrorCode</small>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm>
              <CFormGroup>
                <CLabel htmlFor="text-input">ErrorCode</CLabel>
                <CInput
                  onChange={onChange}
                  name="id"
                  type="text"
                  placeholder="ErrorCode"
                  autoComplete="errorCode"
                  value={form.id}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Error Message</CLabel>
                <CInput
                  onChange={onChange}
                  name="message"
                  type="text"
                  placeholder="Error Message"
                  autoComplete="errorMessage"
                  value={form.message}
                />
              </CFormGroup>
              <CButton onClick={openModal} color="success" block>
                Create ErrorCode
              </CButton>
            </CForm>
            <ConfirmModal
              visible={modal}
              title={"확인"}
              body={"에러 코드를 생성하시겠습니까?"}
              onConfirm={onSubmit}
              onCancel={closeModal}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ErrorCodeRegister;
