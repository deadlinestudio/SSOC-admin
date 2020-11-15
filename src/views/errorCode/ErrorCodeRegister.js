import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeField, postErrorCode, initializeForm} from '../../modules/errorCode/errorCode'
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

const ErrorCodeRegister = () => {
  const dispatch = useDispatch();
  const { form, registerDone, regInitDone} = useSelector(({errorCode})=>({
    form : errorCode.register,
    registerDone : errorCode.registerDone,
    regInitDone : errorCode.regInitDone
  }));
  
  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(()=>{
    console.log('에러코드 인풋필드 초기화');
    dispatch(initializeForm('register'));
  },[dispatch]);

  // 에러코드 성공/실패 처리
  useEffect(()=>{
    if(regInitDone === null)
      return;

    if(registerDone === true){
      console.log(registerDone);
      console.log('에러코드 등록 성공!');
      dispatch(initializeForm('register'));
    }else if(registerDone !== true && registerDone !== null){
      console.log(registerDone);
      console.log('에러코드 등록 실패!');
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

    const {id, message} = form;
    // 하나라도 비어있다면
    if([id,message].includes('')){
      console.log('빈 칸을 모두 입력하세요');
      return;
    }

    dispatch(postErrorCode({id,message}));
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
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
                    <CInput onChange={onChange} name="id" type="text" placeholder="errorCode" autoComplete="errorCode" value={form.id}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={onChange} name="message" type="text" placeholder="errorMessage" autoComplete="errorMessage" value={form.message}/>
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

export default ErrorCodeRegister
