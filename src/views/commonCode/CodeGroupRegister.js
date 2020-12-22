import React, { useEffect, useState } from "react";
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
import { ConfirmModal } from "../notification/modals/Modals";

const CodeGroupRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone } = useSelector(({ codeGroup }) => ({
    form: codeGroup.register,
    registerDone: codeGroup.registerDone,
    regInitDone: codeGroup.regInitDone,
  }));
  const [cdGrpModal, setCdGrpModal] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("공통코드 인풋필드 초기화");
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 코드그룹 등록 성공/실패 처리
  useEffect(() => {
    if (regInitDone === null) return;

    if (registerDone === true) {
      console.log(registerDone);
      console.log("코드그룹 등록 성공!");
      dispatch(initializeForm("register"));
      history.push(`/commoncode/codegroup/list`);
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

  // 확인 모달 열기
  const openModal = () => {
    console.log("경고 모달 열기");
    setCdGrpModal(true);
  };

  // 확인 모달 종료
  const closeModal = () => {
    console.log("경고 모달 닫기");
    setCdGrpModal(false);
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
                  placeholder="ex) club-category"
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
                  placeholder="ex) 클럽 카테고리"
                  autoComplete="definition"
                  value={form.definition}
                />
              </CFormGroup>
              <CButton onClick={openModal} color="success" block>
                Create CodeGroup
              </CButton>
            </CForm>
            <ConfirmModal
              visible={cdGrpModal}
              title={"확인"}
              body={"공통 코드 그룹을 생성하시겠습니까?"}
              onConfirm={onSubmit}
              onCancel={closeModal}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CodeGroupRegister;
