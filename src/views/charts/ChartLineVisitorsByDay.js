import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
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
              label: "This Week",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#41B883",
              borderColor: "#41B883",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "#41B883",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#41B883",
              pointHoverBorderColor: "#41B883",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [30, 39, 10, 50, 30, 70, 35],
            },
            {
              label: "Last Week",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#E46651",
              borderColor: "#E46651",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "#E46651",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#E46651",
              pointHoverBorderColor: "#E46651",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [39, 80, 40, 35, 40, 20, 45],
            },
          ]}
          options={{
            tooltips: {
              enabled: true,
            },
          }}
          labels={[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ]}
        />
      </CCardBody>
    </CCard>
  );
};

export default ChartLineVisitorsByDay;
