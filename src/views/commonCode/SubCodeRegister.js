import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  postCode,
  initializeForm,
} from "../../modules/commonCode/code";
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

const SubCodeRegister = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone } = useSelector(({ code }) => ({
    form: code.register,
    registerDone: code.registerDone,
    regInitDone: code.regInitDone,
  }));
  const [modal, setModal] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("서브코드 인풋필드 초기화");
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 서브코드 등록 성공/실패 처리
  useEffect(() => {
    if (regInitDone === null) return;

    if (registerDone === true) {
      console.log(registerDone);
      console.log("서브코드 등록 성공!");

      dispatch(initializeForm("register"));
      history.push(`/commoncode/subcode/list/${match.params.codeGroupId}/${match.params.codeId}`);
    } else if (registerDone !== true && registerDone !== null) {
      console.log(registerDone);
      console.log("서브코드 등록 실패!");
    }
  }, [registerDone, regInitDone, dispatch, history, match.params.codeGroupId]);

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

    dispatch(
      postCode({
        codeGroupId: match.params.codeGroupId,
        id: id,
        definition: definition,
      })
    );
  };

  // 확인 모달 열기
  const openModal = () => {
    console.log("경고 모달 열기");
    setModal(true);
  };

  // 확인 모달 종료
  const closeModal = () => {
    console.log("경고 모달 닫기");
    setModal(false);
  };

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            <h4>SubCode Register</h4>
            <small>Create your SubCode</small>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm>
              <CFormGroup>
                <CLabel htmlFor="text-input">Code Definition</CLabel>
                <CInput
                  onChange={onChange}
                  name="definition"
                  type="text"
                  placeholder="ex) 농구"
                  autoComplete="definition"
                  value={form.definition}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Code ID</CLabel>
                <CInput
                  onChange={onChange}
                  name="id"
                  type="text"
                  placeholder="ex) 0001"
                  autoComplete="id"
                  value={form.id}
                />
              </CFormGroup>

              <CButton onClick={openModal} color="success" block>
                Create SubCode
              </CButton>
            </CForm>
            <ConfirmModal
              visible={modal}
              title={"확인"}
              body={"서브코드를 생성하시겠습니까?"}
              onConfirm={onSubmit}
              onCancel={closeModal}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SubCodeRegister;
