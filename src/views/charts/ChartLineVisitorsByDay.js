import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";

const ChartLineVisitorsByDay = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          {/* 헤더 */}
          <CCol sm="12">
            <h2 id="traffic" className="card-title mb-0">
                Number of visitors by day of the week
            </h2>
            <div className="small text-muted">November 2020</div>
          </CCol>
        </CRow>
        <CChartLine
            datasets={[
              {
                label: 'This Week',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [30, 39, 10, 50, 30, 70, 35]
              },
              {
                label: 'Last Week',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [39, 80, 40, 35, 40, 20, 45]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ]}
          />
      </CCardBody>
    </CCard>
  );
};

export default ChartLineVisitorsByDay;
