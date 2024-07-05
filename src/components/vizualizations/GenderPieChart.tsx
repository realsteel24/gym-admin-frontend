import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MemberFeeOptions } from "@/hooks";

interface GenderPieChartProps {
  memberFees: MemberFeeOptions[];
}

const GenderPieChart: React.FC<GenderPieChartProps> = ({ memberFees }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && memberFees) {
      // Count members by gender
      const genders: { [key: string]: number } = {};
      memberFees.forEach((member) => {
        const gender = member.Member.User.gender;
        if (gender in genders) {
          genders[gender]++;
        } else {
          genders[gender] = 1;
        }
      });

      // Prepare data for pie chart
      const genderData = Object.keys(genders).map((key) => ({
        name: key,
        value: genders[key],
      }));

      // Initialize ECharts instance
      const chart = echarts.init(chartRef.current);

      // Set up pie chart options
      const option = {
        title: {
          text: "Gender Distribution",
          subtext: "Based on Members",
          left: "center",
          textStyle: {
            fontSize: 16,
            color: localStorage.getItem("darkMode") === "true" ? "White" : "Black",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "center",
          textStyle: {
            color: localStorage.getItem("darkMode") === "true" ? "White" : "Black",
          },
          data: genderData.map((item) => item.name),
        },
        series: [
          {
            name: "Gender",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "outside",
              formatter: "{d}%",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            data: genderData,
          },
        ],
      };

      // Set chart options and resize on window resize
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });

      // Clean up ECharts instance on component unmount
      return () => {
        chart.dispose();
        window.removeEventListener("resize", () => {
          chart.resize();
        });
      };
    }
  }, [memberFees]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default GenderPieChart;
