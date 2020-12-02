import client from "./client";

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
