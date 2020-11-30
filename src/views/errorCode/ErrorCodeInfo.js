import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeField,
  initializeForm,
  deleteErrorCode,
  putErrorCode,
} from "../../modules/errorCode/errorCode";
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
    (info) => info.errorCode.toString() === match.params.id
  );
  // const errorCodeDetail = errorCodeInfo
  //   ? Object.entries(errorCodeInfo)
  //   : [
  //       [
  //         "id",
  //         <span>
  //           <CIcon className="text-muted" name="cui-icon-ban" /> Not found
  //         </span>,
  //       ],
  //     ];

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
      history.push(`/errorCode/errorcodelist`);
    } else if (deleteDone !== null && deleteDone !== true)
      console.log("에러코드 삭제 실패!");
  }, [deleteDone, history]);

  // 에러 코드 수정 dispatch 이루
  useEffect(() => {
    if (updateDone === null) return;

    if (updateDone === true) {
      console.log("에러코드 수정 성공!");
      history.push(`/errorCode/errorcodelist`);
    } else if (updateDone !== null && updateDone !== true)
      console.log("에러코드 수정 실패!");
  }, [updateDone, history]);

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>ErrorCode id: {match.params.id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {/* {errorCodeDetail.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>
                        {key === "errorMessage" ? (
                          <CInput
                            onChange={onChange}
                            name="message"
                            type="text"
                            placeholder={key.toString()}
                            defaultValue={value}
                          />
                        ) : (
                          <strong>{value}</strong>
                        )}
                      </td>
                    </tr>
                  );
                })} */}
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
          </CCardBody>
          <table>
            <tbody>
              <tr>
                <td align="right">
                  <CButton onClick={onRemove} color="danger">
                    삭제
                  </CButton>
                  <CButton onClick={onUpdate} color="info">
                    수정
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ErrorCodeInfo;

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)
