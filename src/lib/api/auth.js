import client from './client';

// 고객리스트 조회
export const getMemberList = ()=>{
    return client.get('api/member');
}

// 클럽리스트 조회
export const getClubList = ()=>{
    return client.get('api/club');
}