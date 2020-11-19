import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { getErrorCodeList, initErrorCodeList } from "../../modules/errorCode/errorCode"

const ErrorCodeList = () => {
    const dispatch = useDispatch()
    const { errorCodeList, initDone, getDone } = useSelector(({errorCode}) => ({
        errorCodeList : errorCode.errorCodeList,
        initDone : errorCode.initDone,
        getDone : errorCode.getDone
    }))
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/errorcode/errorcodelist?page=${newPage}`)   // currentPage !== newPage 이면 history.push(`/users?page=${newPage}`
    }
    
    // 화면 첫 렌더링
    useEffect(()=>{
        console.log("user first rendering")
        dispatch(initErrorCodeList())
    },[dispatch])

    // 에러 코드 목록 초기화 이후 렌더링 = 에러코드 dispatch
    useEffect(()=>{
        if(initDone === null)
            return
        console.log("get codegrouplist start")
        dispatch(getErrorCodeList())
        console.log("get odegrouplist end")
    },[dispatch, initDone])

    useEffect(() => {
        currentPage !== page && setPage(currentPage)                        // currentPage !== newPage 이면 setPage(currentPage)  

    }, [currentPage, page])

    useEffect(()=>{
        if(getDone === null)
            return
        console.log("getDone : ",getDone)
        console.log("codeGroupList : ",errorCodeList);
    })

    return (
        <CRow>
        <CCol xl={6}>
            <CCard>
            <CCardHeader>           
                에러 코드 목록
                <small className="text-muted"> example</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={errorCodeList}
                fields={[
                { key: 'errorCode', _classes: 'font-weight-bold' },
                'errorMessage']}
                hover
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={(item) => {
                    //history.push(`/users/${item.id}`)
                    console.log(item)
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

export default ErrorCodeList


/*
useHistory : location객체에 접근할 수 있게 해주는 hook입니다.
useLocation : location객체에 접근할 수 있게 해주는 hook입니다. 
*/