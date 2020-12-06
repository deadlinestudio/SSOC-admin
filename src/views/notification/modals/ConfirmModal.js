import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const ConfirmModal = ({ visible, title, body, onConfirm, onCancel }) => {
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

export default ConfirmModal;
