import React, { useEffect } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteCodeGroup } from "../../modules/commonCode/codeGroup"
import { CCard, CButton, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const CodeGroupInfo = ({match}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { codeGroupList, deleteDone } = useSelector(({codeGroup}) => ({
        codeGroupList : codeGroup.codeGroupList,
        deleteDone : codeGroup.deleteDone
    }))  
    const codeGroupInfo = codeGroupList.find( info => info.codeGroupId.toString() === match.params.id)
    const CodeGroupDetail = codeGroupInfo ? Object.entries(codeGroupInfo) : 
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    // 코드 그룹 삭제 dispatch 함수
    const onRemove = () => {
        console.log('코드 그룹 삭제 dispatch');
        console.log('삭제할 ID : ',CodeGroupDetail[0][1]);

        dispatch(deleteCodeGroup(CodeGroupDetail[0][1]));
    };

    // 코드 그룹 삭제 dispatch 이후 
    useEffect(()=>{
        if(deleteDone === null)
            return;
        
        if(deleteDone === true){
            console.log('코드그룹 삭제 성공!')
            history.push(`/commoncode/codegrouplist`);
        }else if(deleteDone !== null && deleteDone !== true)
            console.log('코드그룹 삭제 실패!')
    });

    return (
        <CRow>
        <CCol lg={6}>
            <CCard>
            <CCardHeader>
                CodeGroup ID: {match.params.id}
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
                        <CButton onClick={onRemove} color="danger">삭제</CButton>
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

export default CodeGroupInfo

// table 태그를 쓸 때 유의할 점
// 브라우저에는 tbody태그가 필요합니다.
// (코드에 없으면 브라우저가 자동으로 삽입합니다.)