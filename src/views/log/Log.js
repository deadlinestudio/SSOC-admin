import React, { useEffect } from "react";
import {
  CButton,
  CCardGroup,
  CCard,
  CCardBody,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CCol,
  CRow,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Log = () => {
  return (
    <CRow>
      <CCol sm="12" xl="6">
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm>
              <h3>Log Check</h3>
              <p className="text-muted">Choose a date</p>
              <CRow>
                <CCol xl="8">
                  <CInput
                    type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                  />
                </CCol>
                <CCol xl="4">
                  <CButton color="success" block>
                    Check
                  </CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CTextarea
                    name="textarea-input"
                    id="textarea-input"
                    rows="15"
                    placeholder="Content..."
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Log;
