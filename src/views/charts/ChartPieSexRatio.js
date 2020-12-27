import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";
import { getMemberSexRatio, initInfo } from "../../modules/chart/chart";

const ChartPieSexRatio = () => {
  const dispatch = useDispatch();
  const { memberSexRatio, initDone, getMSRDone } = useSelector(({ chart }) => ({
    memberSexRatio: chart.memberSexRatio,
    initDone: chart.initDone,
    getMSRDone: chart.getMSRDone,
  }));

  // 컴포넌트가 처음 렌더링될 때 초기화
  useEffect(() => {
    console.log("로그 초기화 시작");
    dispatch(initInfo());
  }, [dispatch]);

  // 초기화 후 렌더링
  useEffect(() => {
    if (initDone !== true) return;

    dispatch(getMemberSexRatio());
  }, [initDone, dispatch]);

  // 로그 가져온 후 렌더링
  useEffect(() => {
    if (getMSRDone !== true) return;

    console.log("getDone : ", getMSRDone);
  }, [getMSRDone, dispatch]);

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
              data: [memberSexRatio=== null ? 0 : memberSexRatio.maleNum, memberSexRatio === null ? 0 : memberSexRatio.femaleNum],
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
