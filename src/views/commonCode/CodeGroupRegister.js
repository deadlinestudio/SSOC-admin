import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeField, postCodeGroup, initializeForm} from '../../modules/commonCode/codeGroup'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const CodeGroupRegister = () => {
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone} = useSelector(({codeGroup})=>({
    form : codeGroup.register,
    registerDone : codeGroup.registerDone,
    regInitDone : codeGroup.regInitDone
  }));
  
  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(()=>{
    console.log('공통코드 인풋필드 초기화');
    dispatch(initializeForm('register'));
  },[dispatch]);

  // 에러코드 성공/실패 처리
  useEffect(()=>{
    if(regInitDone === null)
      return;

    if(registerDone === true){
      console.log(registerDone);
      console.log('코드그룹 등록 성공!');
      dispatch(initializeForm('register'));
    }else if(registerDone !== true && registerDone !== null){
      console.log(registerDone);
      console.log('코드그룹 등록 실패!');
    }
  },[registerDone,regInitDone,dispatch]);
  
   // 인풋 변경 이벤트 핸들러
  const onChange = e =>{
    const {value, name} = e.target;
    dispatch(
      changeField({
        form:'register',
        key:name,
        value
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e =>{
    e.preventDefault();

    const {definition, id} = form;
    // 하나라도 비어있다면
    if([definition,id].includes('')){
      console.log('빈 칸을 모두 입력하세요');
      return;
    }

    dispatch(postCodeGroup({definition,id}));
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>CodeGroup Register</h1>
                  <p className="text-muted">Create your CodeGroup</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={onChange} name="definition" type="text" placeholder="definition" autoComplete="definition" value={form.definition}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={onChange} name="id" type="text" placeholder="id" autoComplete="id" value={form.id}/>
                  </CInputGroup>
                  <CButton onClick={onSubmit} color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CodeGroupRegister
