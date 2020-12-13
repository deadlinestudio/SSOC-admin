import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmModal = ({ visible, title, body, onConfirm, onCancel }) => {
  return (
    <CModal show={visible} onClose={onCancel} color="info">
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {body}
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={onConfirm}>
          확인
        </CButton>
        <CButton color="secondary" onClick={onCancel}>
          취소
        </CButton>{" "}
      </CModalFooter>
    </CModal>
  );
};

export const AlertModal = ({ visible, title, body, onCancel }) =>{
  return (
    <div>
      <CModal show={visible} onClose={onCancel} color="danger">
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {body}
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={onCancel}>
          확인
        </CButton>{" "}
      </CModalFooter>
    </CModal>
    </div>
  );
};
