import React from 'react'
import { useSelector} from 'react-redux'
import { CCard, CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ErrorCodeInfo = ({match}) => {
    const { codeGroupList } = useSelector(({codeGroup}) => ({
        codeGroupList : codeGroup.codeGroupList
    }))  
    const codeGroupInfo = codeGroupList.find( info => info.codeGroupId.toString() === match.params.id)
    const CodeGroupDetail = codeGroupInfo ? Object.entries(codeGroupInfo) : 
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    return (
        <CRow>
        <CCol lg={6}>
            <CCard>
            <CCardHeader>
                CodeGroup id: {match.params.id}
            </CCardHeader>
            <CCardBody>
                <table className="table table-striped table-hover">
                    <tbody>
                    {
                        CodeGroupDetail.map(([key, value], index) => {
                        return (
                            <tr key={index.toString()}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                            </tr>
                        )
                        })
                    }
                    </tbody>
                </table>
            </CCardBody>
            <table>
                <tbody>
                    <tr>
                        <td align="right"> 
                        <CButton color="danger">삭제</CButton>
                        <CButton color="info">수정</CButton>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            </CCard>
        </CCol>
        </CRow>
    )
}

export default ErrorCodeInfo

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)