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

import { initClubList, getClubList } from "../../modules/club/club"

const getBadge = status => {
    switch (status) {
        case '10': return 'success'
        case '20': return 'secondary'
        case '30': return 'warning'
        case '40': return 'danger'
        default: return 'primary'
    }
}

const ClubList = () => {
    const dispatch = useDispatch()
    const { clubList, initDone, getDone } = useSelector(({club}) => ({
        clubList : club.clubList,
        initDone : club.initDone,
        getDone : club.getDone
    }))
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/club/clublist?page=${newPage}`)   // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
    }
    
    // 화면 첫 렌더링
    useEffect(()=>{
        console.log("user first rendering")
        dispatch(initClubList())
    },[dispatch])

    // 멤버리스트 초기화 이후 렌더링 = 멤버리스트 dispatch
    useEffect(()=>{
        if(initDone === null)
            return
        console.log("get clublist start")
        dispatch(getClubList())
        console.log("get clublist end")
    },[dispatch, initDone])

    useEffect(() => {
        currentPage !== page && setPage(currentPage)                        // currentPage !== newPage 이면 setPage(currentPage)  

    }, [currentPage, page])

    useEffect(()=>{
        if(getDone === null)
            return
        console.log("getDone : ",getDone)
        console.log("clubList : ",clubList);
    })

    return (
        <CRow>
        <CCol xl={6}>
            <CCard>
            <CCardHeader>           
                클럽목록
                <small className="text-muted"> example</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={clubList}
                fields={[
                { key: 'title', _classes: 'font-weight-bold' },
                'body', 'categoryCode', 'statusCode'
                ]}
                hover
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots = {{
                'statusCode':
                    (item)=>(
                    <td>
                        <CBadge color={getBadge(item.statusCode)}>
                        {item.statusCode === '10' ? "활성화" : item.statusCode === '20' ? "몰라" : "더 몰라"}
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

export default ClubList


/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/