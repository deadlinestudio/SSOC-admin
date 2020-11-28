import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, postClub, initializeForm } from "../../modules/club/club";
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

const ClubRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone } = useSelector(({ club }) => ({
    form: club.register,
    registerDone: club.registerDone,
    regInitDone: club.regInitDone,
  }));

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("클럽 인풋필드 초기화");
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 클럽 성공/실패 처리
  useEffect(() => {
    if (regInitDone === null) return;

    if (registerDone === true) {
      console.log(registerDone);
      console.log("클럽 등록 성공!");
      dispatch(initializeForm("register"));
      history.push(`/club/clublist`);
    } else if (registerDone !== true && registerDone !== null) {
      console.log(registerDone);
      console.log("클럽 등록 실패!");
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

    const {
      areaCode,
      body,
      capacity,
      categoryCode,
      detailCategoryCode,
      ownerMemberId,
      privateFlag,
      title,
    } = form;
    // 하나라도 비어있다면
    if (
      [
        areaCode,
        body,
        capacity,
        categoryCode,
        detailCategoryCode,
        ownerMemberId,
        privateFlag,
        title,
      ].includes("")
    ) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(
      postClub({
        areaCode,
        body,
        capacity,
        categoryCode,
        detailCategoryCode,
        ownerMemberId,
        privateFlag,
        title,
      })
    );
  };

  return (
    <CCardGroup columns className="cols-1">
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm>
            <h1>Club Register</h1>
            <p className="text-muted">Create your Club</p>
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
                placeholder="id"
                autoComplete="id"
                value={form.id}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupPrepend>
                <CInputGroupText>@</CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                onChange={onChange}
                name="definition"
                type="text"
                placeholder="definition"
                autoComplete="definition"
                value={form.definition}
              />
            </CInputGroup>
            <CButton onClick={onSubmit} color="success" block>
              Create Account
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default ClubRegister;
