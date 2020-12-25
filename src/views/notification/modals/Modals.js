import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

export const ConfirmModal = ({ visible, title, body, onConfirm, onCancel, color }) => {
  return (
    <CModal show={visible} onClose={onCancel} color={color}>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {body}
      </CModalBody>
      <CModalFooter>
        <CButton color={color} onClick={onConfirm}>
          확인
        </CButton>
        <CButton color="secondary" onClick={onCancel}>
          취소
        </CButton>{" "}
      </CModalFooter>
    </CModal>
  );
};

export const AlertModal = ({ visible, title, body, onCancel, color }) =>{
  return (
    <div>
      <CModal show={visible} onClose={onCancel} color={color}>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {body}
      </CModalBody>
      <CModalFooter>
        <CButton color={color} onClick={onCancel}>
          확인
        </CButton>{" "}
      </CModalFooter>
    </CModal>
    </div>
  );
};
