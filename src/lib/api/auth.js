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

// 공통 코드 그룹 생성
export const postCodeGroup = ({definition, id})=>{
    return client.post('api/common/code-group',{definition,id});
}

// 공통 코드 그룹 삭제
export const deleteCodeGroup = (id)=>{
    return client.delete(`api/common/code-group/${id}`);
}

// 공통 코드 키워드 검색 조회
export const getGroupCommonCodeList = ()=>{
    return client.get('api/common/code');
}

// 에러 코드 전체 조회
export const getErrorCodeList = ()=>{
    return client.get('api/common/error-code');
}

// 에러 코드 등록
export const postErrorCode = ({id, message})=>{
    return client.post('api/common/error-code',{id, message});
}