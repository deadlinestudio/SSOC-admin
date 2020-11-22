import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { initMemberList, getMemberList } from "../../modules/member/member"

const getBadge = status => {
    switch (status) {
        case '10': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case '40': return 'danger'
        default: return 'primary'
    }
}

const MemberList = () => {
    const dispatch = useDispatch()
    const { memberList, initDone, getDone } = useSelector(({member}) => ({
        memberList : member.memberList,
        initDone : member.initDone,
        getDone : member.getDone
    }))
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/member/memberlist?page=${newPage}`)   // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
    }
    
    // 화면 첫 렌더링
    useEffect(()=>{
        console.log("user first rendering")
        dispatch(initMemberList())
    },[dispatch])

    // 멤버리스트 초기화 이후 렌더링 = 멤버리스트 dispatch
    useEffect(()=>{
        if(initDone === null)
            return
        console.log("get memberlist start")
        dispatch(getMemberList())
        console.log("get memberlist end")
    },[dispatch, initDone])

    // 멤버리스트 리스트 가져온 후 렌더링
    useEffect(()=>{
        if(getDone !== true)
            return

        console.log("get memberlist success");     
        console.log("getDone : ",getDone)
    },[getDone])

    useEffect(() => {
        currentPage !== page && setPage(currentPage)                        // currentPage !== newPage 이면 setPage(currentPage)  

    }, [currentPage, page])

    return (
        <CRow>
        <CCol xl={6}>
            <CCard>
            <CCardHeader>           
                회원목록
                <small className="text-muted"> example</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={memberList}
                fields={[
                { key: 'username', _classes: 'font-weight-bold' },
                'signUpDateTime', 'email', 'birthDay','statusCode'
                ]}
                hover
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={(item) => {
                    //history.push(`/users/${item.id}`)
                    console.log(item)
                }}
                scopedSlots = {{
                'statusCode':
                    (item)=>(
                    <td>
                        <CBadge color={getBadge(item.statusCode)}>
                        {item.statusCode === '10' ? "정상" : item.statusCode === '40' ? "정지" : "몰라"}
                        </CBadge>
                    </td>
                    )
                }}
            />
            <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={5}
                doubleArrows={false} 
                align="center"
            />
            </CCardBody>
            </CCard>
        </CCol>
        </CRow>
    )
}

export default MemberList


/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/