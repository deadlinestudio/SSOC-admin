import client from "./client";

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