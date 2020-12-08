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
    <CCardGroup columns className="cols-1">
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm>
            <h3>Log Check</h3>
            <p className="text-muted">Choose a date</p>
            <CCol xs="12" md="6">
              <CRow>
                <CInput
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                />
                <CButton color="success">Check</CButton>
              </CRow>
            </CCol>
            <CCol xs="12" md="12">
              <CTextarea
                name="textarea-input"
                id="textarea-input"
                rows="15"
                placeholder="Content..."
              />
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Log;
