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

// 공통 코드 키워드 검색 조회
export const getGroupCommonCodeList = () => {
  return client.get("api/common/code");
};