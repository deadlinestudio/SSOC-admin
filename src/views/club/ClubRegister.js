import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, postClub, initializeForm } from "../../modules/club/club";
import {
  getAreaCodeList,
  getCategoryCodeList,
  getDetailCodeList,
  initCodeList,
} from "../../modules/commonCode/code";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CInput,
  CSelect,
  CRow,
  CCol,
  CCardHeader,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { ConfirmModal } from "../notification/modals/Modals";

const ClubRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone } = useSelector(({ club }) => ({
    form: club.register,
    registerDone: club.registerDone,
    regInitDone: club.regInitDone,
  }));
  const { categoryCode, detailCode, areaCode, initDone } = useSelector(
    ({ code }) => ({
      categoryCode: code.categoryCode,
      detailCode: code.detailCode,
      areaCode: code.areaCode,
      initDone: code.initDone,
      getDone: code.getDone,
    })
  );
  const [clubModal, setClubModal] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("클럽 인풋필드 초기화");
    dispatch(initializeForm("register"));
    console.log("코드 리스트 초기화");
    dispatch(initCodeList());
  }, [dispatch]);

  // 코드 리스트 초기화 이후 렌더링
  useEffect(() => {
    if (initDone === null) return;

    dispatch(getCategoryCodeList({ codeGroupId: "club-category" }));
    dispatch(getAreaCodeList({ codeGroupId: "area-code", codeId: "0000" }));
  }, [initDone, dispatch]);

  // 클럽 등록 성공/실패 처리
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

  // 확인 모달 열기
  const openModal = () => {
    console.log("경고 모달 열기");
    setClubModal(true);
  };

  // 확인 모달 종료
  const closeModal = () => {
    console.log("경고 모달 닫기");
    setClubModal(false);
  };

  const AreaCode = () => {
    if (areaCode === null) return null;

    console.log("areaCode : ", areaCode);
    const codeList = areaCode.map((code, i) => (
      <option key={i} value={code.codeId}>
        {code.codeDefinition}
      </option>
    ));
    return codeList;
  };

  const CategoryCode = () => {
    if (categoryCode === null) return null;

    console.log("categoryCode : ", categoryCode);
    const codeList = categoryCode.map((code, i) => (
      <option value={code.codeId}>{code.codeDefinition}</option>
    ));
    return codeList;
  };

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            <h4>Club Register</h4>
            <small> Create your Club </small>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm>
              <CFormGroup>
                <CLabel htmlFor="text-input">Title</CLabel>
                <CInput
                  onChange={onChange}
                  name="title"
                  type="text"
                  placeholder="Title"
                  autoComplete="title"
                  value={form.title}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Body</CLabel>
                <CInput
                  onChange={onChange}
                  name="body"
                  type="text"
                  placeholder="Body"
                  autoComplete="body"
                  value={form.body}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Category Code</CLabel>
                <CSelect
                  onChange={onChange}
                  name="categoryCode"
                  type="text"
                  placeholder="Category Code"
                  autoComplete="categoryCode"
                >
                  <option value="0">Please select</option>
                  {categoryCode === null
                    ? null
                    : categoryCode.map((code, i) => (
                        <option key={i} value={code.codeId}>
                          {code.codeDefinition}
                        </option>
                      ))}
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Detail Category Code</CLabel>
                <CInput
                  onChange={onChange}
                  name="detailCategoryCode"
                  type="text"
                  placeholder="Detail Category Code"
                  autoComplete="detailCategoryCode"
                  value={form.detailCategoryCode}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Area Code</CLabel>
                <CSelect
                  onChange={onChange}
                  name="areaCode"
                  type="text"
                  placeholder="Area Code"
                  autoComplete="areaCode"
                >
                  <option>Please Select</option>
                  {areaCode === null
                    ? null
                    : areaCode.map((code, i) => (
                        <option key={i} value={code.codeId}>
                          {code.codeDefinition}
                        </option>
                      ))}
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Owner Member Id</CLabel>
                <CInput
                  onChange={onChange}
                  name="ownerMemberId"
                  type="text"
                  placeholder="Owner Member Id"
                  autoComplete="ownerMemberId"
                  value={form.ownerMemberId}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Capacity</CLabel>
                <CInput
                  onChange={onChange}
                  name="capacity"
                  type="text"
                  placeholder="Capacity"
                  autoComplete="capacity"
                  value={form.capacity}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Private Flag</CLabel>
                <CInput
                  onChange={onChange}
                  name="privateFlag"
                  type="text"
                  placeholder="Private Flag"
                  autoComplete="privateFlag"
                  value={form.privateFlag}
                />
              </CFormGroup>
              <CButton onClick={openModal} color="success" block>
                Create Club
              </CButton>
            </CForm>
            <ConfirmModal
              visible={clubModal}
              title={"확인"}
              body={"클럽을 생성하시겠습니까?"}
              onConfirm={onSubmit}
              onCancel={closeModal}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ClubRegister;
