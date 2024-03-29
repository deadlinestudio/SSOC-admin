import client from "./client";

// 공통 코드 그룹 전체 조회
export const getCodeGroupList = () => {
  return client.get("api/common/code-group");
};

// 공통 코드 그룹 등록
export const postCodeGroup = ({ id, definition }) => {
  return client.post("api/common/code-group", { id, definition });
};

// 공통 코드 그룹 삭제
export const deleteCodeGroup = (id) => {
  return client.delete(`api/common/code-group/${id}`);
};

// 공통 코드 그룹 수정
export const putCodeGroup = ({ id, definition }) => {
  return client.put(`api/common/code-group/${id}`, { definition });
};

// 공통 코드 등록
export const postCode = ({ codeGroupId, id, definition }) => {
  return client.post(`api/common/code/${codeGroupId}`, { id, definition });
};

// 공통 코드 삭제
export const deleteCode = ({codeGroupId, codeId}) => {
  return client.delete(`api/common/code/${codeGroupId}/${codeId}`);
};

// 공통 코드 수정
export const putCode = ({ codeGroupId, codeId, definition }) => {
  return client.put(`api/common/code/${codeGroupId}/${codeId}`, { definition });
};

// 메인 코드 조회
export const getMainCodeList = ({codeGroupId}) => {
  return client.get(`api/common/code/${codeGroupId}?parentOnly=true`);
};

// 서브 코드 조회
export const getSubCodeList = ({codeGroupId, codeId}) => {
  return client.get(`api/common/code/${codeGroupId}/${codeId}`);
};

