import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";

const ChartBarMembersByCategory = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          {/* 헤더 */}
          <CCol sm="12">
            <h2 id="traffic" className="card-title mb-0">
              Number of members by category
            </h2>
            <div className="small text-muted">November 2020</div>
          </CCol>
        </CRow>
        <CChartBar
          datasets={[
            {
              label: "number of members",
              backgroundColor: "rgba(228,102,81,0.4)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(228,102,81,0.4)",
              hoverBorderColor: "rgba(228,102,81,1)",
              data: [
                33,
                20,
                18,
                25,
                10,
                4,
                31,
                55,
                42,
                61,
                22,
                31,
                43,
                18,
                22,
                25,
                15,
                40,
              ],
            },
          ]}
          labels={[
            "운동/스포츠",
            "아웃도어/여행",
            "문화/공연",
            "인문학/책/글",
            "외국어/언어",
            "음악/악기",
            "공예/만들기",
            "댄스/무용",
            "봉사활동",
            "사교/인맥",
            "차/오토바이",
            "사진/영상",
            "스포츠경기관람",
            "게임/오락",
            "요리/백종원",
            "반려동물",
            "맛집탐방",
            "자유쥬제",
          ]}
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

export default ChartBarMembersByCategory;
