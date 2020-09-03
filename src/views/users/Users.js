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

import { initMemberList, getMemberList } from "../../modules/member"

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const Users = () => {
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
        currentPage !== newPage && history.push(`/users?page=${newPage}`)   // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
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

    useEffect(() => {
        currentPage !== page && setPage(currentPage)                        // currentPage !== newPage 이면 setPage(currentPage)  

    }, [currentPage, page])

    useEffect(()=>{
        if(getDone === null)
            return
        console.log("getDone : ",getDone)
        console.log("memberList : ",memberList);
    })

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
                'signUpDateTime', 'email', 'birthDay'
                ]}
                hover
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots = {{
                'status':
                    (item)=>(
                    <td>
                        <CBadge color={getBadge(item.status)}>
                        {item.status}
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

export default Users  


/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/