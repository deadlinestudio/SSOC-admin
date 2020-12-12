import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  postCodeGroup,
  initializeForm,
} from "../../modules/commonCode/codeGroup";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CInput,
  CCol,
  CRow,
  CCardHeader,
  CFormGroup,
  CLabel,
} from "@coreui/react";

const CodeGroupRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone } = useSelector(({ codeGroup }) => ({
    form: codeGroup.register,
    registerDone: codeGroup.registerDone,
    regInitDone: codeGroup.regInitDone,
  }));

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("공통코드 인풋필드 초기화");
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 에러코드 성공/실패 처리
  useEffect(() => {
    if (regInitDone === null) return;

    if (registerDone === true) {
      console.log(registerDone);
      console.log("코드그룹 등록 성공!");
      dispatch(initializeForm("register"));
      history.push(`/commoncode/codegrouplist`);
    } else if (registerDone !== true && registerDone !== null) {
      console.log(registerDone);
      console.log("코드그룹 등록 실패!");
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

    const { definition, id } = form;
    // 하나라도 비어있다면
    if ([definition, id].includes("")) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(postCodeGroup({ definition, id }));
  };

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            <h4>CodeGroup Register</h4>
            <small>Create your CodeGroup</small>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm>
              <CFormGroup>
                <CLabel htmlFor="text-input">ID</CLabel>
                <CInput
                  onChange={onChange}
                  name="id"
                  type="text"
                  placeholder="ID"
                  autoComplete="id"
                  value={form.id}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Definition</CLabel>
                <CInput
                  onChange={onChange}
                  name="definition"
                  type="text"
                  placeholder="Definition"
                  autoComplete="definition"
                  value={form.definition}
                />
              </CFormGroup>
              <CButton onClick={onSubmit} color="success" block>
                Create CodeGroup
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CodeGroupRegister;
