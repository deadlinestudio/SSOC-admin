import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeField,
  initializeForm,
  deleteClub,
  putClub,
} from "../../modules/club/club";
import { ConfirmModal } from "../notification/modals/Modals";
import {
  CInput,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

const ClubInfo = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, clubList, deleteDone, updateDone } = useSelector(
    ({ club }) => ({
      form: club.update,
      clubList: club.clubList,
      deleteDone: club.deleteDone,
      updateDone: club.updateDone,
    })
  );
  const clubInfo = clubList.find(
    (info) => info.id.toString() === match.params.clubId
  );
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // 클럽 삭제 dispatch 함수
  const onRemove = () => {
    console.log("클럽 삭제 dispatch");
    console.log("삭제할 ID : ", clubInfo.id);

    dispatch(deleteClub(clubInfo.id));
  };

  // 클럽 수정 dispatch 함수
  const onUpdate = () => {
    console.log("클럽 수정 dispatch");

    const {
      areaCode,
      body,
      capacity,
      categoryCode,
      detailCategoryCode,
      modifierId,
      privateFlag,
    } = form;
    const id = clubInfo.id;
    console.log("areaCode : ", areaCode);
    console.log("id : ", id);
    // 하나라도 비어있다면
    if (
      [
        areaCode,
        body,
        capacity,
        categoryCode,
        detailCategoryCode,
        modifierId,
        privateFlag,
      ].includes("")
    ) {
      console.log("빈 칸을 모두 입력하세요");
      return;
    }

    dispatch(
      putClub({
        id,
        areaCode,
        body,
        capacity,
        categoryCode,
        detailCategoryCode,
        modifierId,
        privateFlag,
      })
    );
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

  // 수정 확인 모달 열기
  const openEditModal = () => {
    console.log("수정 확인 모달 열기");
    setEditModal(true);
  };

  // 수정 확인 모달 종료
  const closeEditModal = () => {
    console.log("수정 확인 모달 닫기");
    setEditModal(false);
  };

  // 삭제 확인 모달 열기
  const openDeleteModal = () => {
    console.log("삭제 확인 모달 열기");
    setDeleteModal(true);
  };

  // 삭제 확인 모달 종료
  const closeDeleteModal = () => {
    console.log("삭제 확인 모달 닫기");
    setDeleteModal(false);
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    console.log("클럽 인풋필드 초기화");
    dispatch(initializeForm("update"));

    const updateInfo = {
      areaCode: clubInfo.area,
      body: clubInfo.body,
      capacity: clubInfo.totalMemberNum,
      categoryCode: clubInfo.category,
      detailCategoryCode: clubInfo.detailCategory,
      modifierId: 1,
      privateFlag: clubInfo.privateFlag,
    };

    for (const key in updateInfo)
      dispatch(
        changeField({ form: "update", key: key, value: updateInfo[key] })
      );
  }, [clubInfo, dispatch]);

  // 클럽 삭제 dispatch 이후
  useEffect(() => {
    if (deleteDone === null) return;

    if (deleteDone === true) {
      console.log("클럽 삭제 성공!");
      history.push(`/club/list`);
    } else if (deleteDone !== null && deleteDone !== true)
      console.log("클럽 삭제 실패!");
  }, [deleteDone, history]);

  // 클럽 수정 dispatch 이후
  useEffect(() => {
    if (updateDone === null) return;

    if (updateDone === true) {
      console.log("클럽 수정 성공!");
      history.push(`/club/list`);
    } else if (updateDone !== null && updateDone !== true)
      console.log("클럽 수정 실패!");
  }, [updateDone, history]);

  return (
    <CRow>
      <CCol sm="12" xl="12">
        <CCard className="mx-4">
          <CCardHeader>
            클럽 정보 수정{" "}
            <small className="text-muted"> {match.params.cludId}</small>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>id</td>
                  <td>
                    <strong>{clubInfo.id}</strong>
                  </td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>
                    <strong>{clubInfo.title}</strong>
                  </td>
                </tr>
                <tr>
                  <td>body</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="body"
                      type="text"
                      defaultValue={clubInfo.body}
                    />
                  </td>
                </tr>
                <tr>
                  <td>category</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="categoryCode"
                      type="text"
                      defaultValue={clubInfo.category}
                    />
                  </td>
                </tr>
                <tr>
                  <td>detailCategory</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="detailCategoryCode"
                      type="text"
                      defaultValue={clubInfo.detailCategory}
                    />
                  </td>
                </tr>
                <tr>
                  <td>area</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="areaCode"
                      type="text"
                      defaultValue={clubInfo.area}
                    />
                  </td>
                </tr>
                <tr>
                  <td>clubCreationDateTime</td>
                  <td>
                    <strong>{clubInfo.clubCreationDateTime}</strong>
                  </td>
                </tr>
                <tr>
                  <td>currentMemberNum</td>
                  <td>
                    <strong>{clubInfo.currentMemberNum}</strong>
                  </td>
                </tr>
                <tr>
                  <td>totalMemberNum</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="capacity"
                      type="text"
                      defaultValue={clubInfo.totalMemberNum}
                    />
                  </td>
                </tr>
                <tr>
                  <td>privateFlag</td>
                  <td>
                    <CInput
                      onChange={onChange}
                      name="privateFlag"
                      type="text"
                      defaultValue={clubInfo.privateFlag}
                    />
                  </td>
                </tr>
                <tr>
                  <td>thumbnailPicUrl</td>
                  <td>
                    <strong>{clubInfo.thumbnailPicUrl}</strong>
                  </td>
                </tr>
                <tr>
                  <td>statusCode</td>
                  <td>
                    <strong>{clubInfo.statusCode}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <CButton onClick={openDeleteModal} color="danger">
              삭제
            </CButton>
            <CButton onClick={openEditModal} color="info">
              수정
            </CButton>
            <ConfirmModal
              visible={editModal}
              title={"확인"}
              body={"클럽을 수정하시겠습니까?"}
              onConfirm={onUpdate}
              onCancel={closeEditModal}
              color={"info"}
            />
            <ConfirmModal
              visible={deleteModal}
              title={"확인"}
              body={"클럽을 삭제하시겠습니까?"}
              onConfirm={onRemove}
              onCancel={closeDeleteModal}
              color={"danger"}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ClubInfo;

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)
