import client from "./client";

// 공통 코드 캐시 리로드
export const postCommonCode = () => {
  return client.post("api/cache/load/common-code");
};

// 공통 코드 그룹 캐시 리로드
export const postCommonCodeGroup = () => {
  return client.post("api/cache/load/common-code-group");
};
