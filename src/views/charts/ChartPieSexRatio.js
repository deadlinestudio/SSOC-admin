import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";

const ChartPieSexRatio = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          {/* 헤더 */}
          <CCol sm="5">
            <h2 id="traffic" className="card-title mb-0">
              Members' sex ratio
            </h2>
            <div className="small text-muted">November 2020</div>
          </CCol>
        </CRow>
        <CChartPie
          datasets={[
            {
              backgroundColor: ["#41B883", "#E46651"],
              data: [40, 20],
            },
          ]}
          labels={["Man", "Woman"]}
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

export default ChartPieSexRatio;
