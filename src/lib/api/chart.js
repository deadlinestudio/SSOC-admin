import client from "./client";

// 회원 성비 조회
export const getMemberSexRatio = () => {
  return client.get("api/statistics/member/gender-ratio");
};