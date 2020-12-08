import client from "./client";

// 로그 파일 다운 로드
export const getLog = ({year, month, date}) => {
  return client.get(`api/log/${year}/${month}/${date}`);
};
