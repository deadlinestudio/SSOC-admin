import React from "react";
import { CCardGroup, CCol, CRow } from "@coreui/react";

import MainChartExample from "../charts/MainChartExample.js";
import ChartPieSexRatio from "../charts/ChartPieSexRatio.js";
import CharBarSubscriptionNumber from "../charts/ChartBarSubscriptionNumber.js";

const Dashboard = () => {
  return (
    <CRow>
      <CCol>
        <CCardGroup className="mx-4">
          <ChartPieSexRatio />
          <CharBarSubscriptionNumber />
        </CCardGroup>
        <CCardGroup className="mx-4">
          <MainChartExample  style={{ height: "300px", marginTop: "40px" }} />
        </CCardGroup>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
