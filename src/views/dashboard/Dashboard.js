import React from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import { CChartBar, CChartPie } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";

const Dashboard = () => {
  return (
    <CRow>
      <CCol>
        <CCardGroup>
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
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
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
                    backgroundColor: "#f87979",
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
        </CCardGroup>
        <CCard>
          <CCardBody>
            <CRow>
              {/* 헤더 */}
              <CCol sm="5">
                <h2 id="traffic" className="card-title mb-0">
                  Statistics
                </h2>
                <div className="small text-muted">November 2020</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton color="primary" className="float-right">
                  <CIcon name="cil-cloud-download" />
                </CButton>
                <CButtonGroup className="float-right mr-3">
                  {["Day", "Month", "Year"].map((value) => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === "Month"}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
            {/* 차트 */}
            <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
          </CCardBody>
          {/* 풋터 */}
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1} // 간격
                  color="success" // 막대 색
                  value={40} // 막대 퍼센트
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="info"
                  value={20}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="warning"
                  value={60}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="danger"
                  value={80}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Bounce Rate</div>
                <strong>Average Rate (40.15%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  value={40}
                />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
