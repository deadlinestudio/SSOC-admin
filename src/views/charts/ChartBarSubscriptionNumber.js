import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";

const CharBarSubscriptionNumber = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          {/* 헤더 */}
          <CCol sm="12">
            <h2 id="traffic" className="card-title mb-0">
              Number of member subscriptions per period
            </h2>
            <div className="small text-muted">November 2020</div>
          </CCol>
        </CRow>
        <CChartBar
          datasets={[
            {
              label: "subscriptions",
              backgroundColor: "#636f83",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            },
          ]}
          labels="months"
          options={{
            tooltips: {
              enabled: true,
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

export default CharBarSubscriptionNumber;
