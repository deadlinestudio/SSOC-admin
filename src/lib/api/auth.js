import client from "./client";

// 고객리스트 조회
export const getMemberList = () => {
  return client.get("api/member");
};

// 클럽리스트 조회
export const getClubList = () => {
  return client.get("api/club");
};

// 클럽 등록
export const postClub = ({
  areaCode,
  body,
  capacity,
  categoryCode,
  detailCategoryCode,
  ownerMemberId,
  privateFlag,
  title,
}) => {
  return client.post("api/club", {
    areaCode,
    body,
    capacity,
    categoryCode,
    detailCategoryCode,
    ownerMemberId,
    privateFlag,
    title,
  });
};

// 클럽 삭제
export const deleteClub = (id) => {
  return client.delete(`api/club/${id}`);
};

// 클럽 수정
export const putClub = ({
  id,
  areaCode,
  body,
  capacity,
  categoryCode,
  detailCategoryCode,
  modifierId,
  privateFlag,
}) => {
  return client.put(`api/club/${id}`, {
    areaCode,
    body,
    capacity,
    categoryCode,
    detailCategoryCode,
    modifierId,
    privateFlag,
  });
};

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

// 에러 코드 전체 조회
export const getErrorCodeList = () => {
  return client.get("api/common/error-code");
};

// 에러 코드 등록
export const postErrorCode = ({ id, message }) => {
  return client.post("api/common/error-code", { id, message });
};

// 에러 코드 그룹 삭제
export const deleteErrorCode = (id) => {
  return client.delete(`api/common/error-code/${id}`);
};

// 에러 코드 그룹 수정
export const putErrorCode = ({ id, message }) => {
  return client.put(`api/common/error-code/${id}`, { message });
};
