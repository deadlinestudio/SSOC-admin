import client from './client';

// 고객리스트 조회
export const getMemberList = ()=>{
    return client.get('api/member');
}

// 클럽리스트 조회
export const getClubList = ()=>{
    return client.get('api/club');
}

// 공통 코드 그룹 전체 조회
export const getCodeGroupList = ()=>{
    return client.get('api/common/code-group');
}

// 그룹 별 공통 코드 전체 조회
export const getGroupCommonCodeList = ()=>{
    return client.get('api/common/code-group');
}

// 에러 코드 전체 조회
export const getErrorCodeList = ()=>{
    return client.get('api/common/error-code');
}

// 에러 코드 등록
export const postErrorCode = ({id, message})=>{
    return client.post('api/common/error-code',{id, message});
}