import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  postErrorCode,
  initializeForm,
} from "../../modules/errorCode/errorCode";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCardGroup,
  CCard,
  CCardBody,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ErrorCodeRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, registerDone, regInitDone } = useSelector(({ errorCode }) => ({
    form: errorCode.register,
    registerDone: errorCode.registerDone,
    regInitDone: errorCode.regInitDone,
  }));

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
      history.push(`/errorCode/errorcodelist`);
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

  return (
    <CCardGroup columns className="cols-1">
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm>
            <h1>ErrorCode Register</h1>
            <p className="text-muted">Create your ErrorCode</p>
            <CInputGroup className="mb-3">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                onChange={onChange}
                name="id"
                type="text"
                placeholder="errorCode"
                autoComplete="errorCode"
                value={form.id}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupPrepend>
                <CInputGroupText>@</CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                onChange={onChange}
                name="message"
                type="text"
                placeholder="errorMessage"
                autoComplete="errorMessage"
                value={form.message}
              />
            </CInputGroup>
            <CButton onClick={onSubmit} color="success" block>
              Create ErrorCode
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default ErrorCodeRegister;
