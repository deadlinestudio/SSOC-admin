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

import { getCodeGroupList, initCodeGroupList } from "../../modules/commonCode/codeGroup"

const getBadge = status => {
    switch (status) {
        case '10': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case '40': return 'danger'
        default: return 'primary'
    }
}

const CodeGroupList = () => {
    const dispatch = useDispatch()
    const { codeGroupList, initDone, getDone } = useSelector(({codeGroup}) => ({
        codeGroupList : codeGroup.codeGroupList,
        initDone : codeGroup.initDone,
        getDone : codeGroup.getDone
    }))
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/code/codegrouplist?page=${newPage}`)   // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
    }
    
    // 화면 첫 렌더링
    useEffect(()=>{
        console.log("user first rendering")
        dispatch(initCodeGroupList())
    },[dispatch])

    // 멤버리스트 초기화 이후 렌더링 = 멤버리스트 dispatch
    useEffect(()=>{
        if(initDone === null)
            return
        console.log("get codegrouplist start")
        dispatch(getCodeGroupList())
        console.log("get odegrouplist end")
    },[dispatch, initDone])

    useEffect(() => {
        currentPage !== page && setPage(currentPage)                        // currentPage !== newPage 이면 setPage(currentPage)  

    }, [currentPage, page])

    useEffect(()=>{
        if(getDone === null)
            return
        console.log("getDone : ",getDone)
        console.log("codeGroupList : ",codeGroupList);
    })

    return (
        <CRow>
        <CCol xl={6}>
            <CCard>
            <CCardHeader>           
                공통 코드 그룹 목록
                <small className="text-muted"> example</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={codeGroupList}
                fields={[
                { key: 'codeGroupId', _classes: 'font-weight-bold' },
                'codeGroupDefinition', 'createDateTime', 'updateDateTime'
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

export default CodeGroupList


/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/