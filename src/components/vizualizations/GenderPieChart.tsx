import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MemberFeeOptions } from "@/hooks";

interface GenderPieChartProps {
  memberFees: MemberFeeOptions[];
}

const GenderPieChart: React.FC<GenderPieChartProps> = ({ memberFees }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<echarts.ECharts | null>(null);


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
        chartInstanceRef.current = chart; // Store instance in ref


      // Set up pie chart options
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: "right",
          top: "bottom",
          textStyle: {
            color:
              localStorage.getItem("darkMode") === "true" ? "White" : "Black",
          },
          data: genderData.map((item) => item.name),
        },
        series: [
          {
            
            name: "Gender",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            right: "20%",
            left: "20%",
            
            label: {
              show: true,
              position: "outside",
              formatter: " {d}%",
                fontWeight: "bold",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 18,
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
      const handleResize = () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.resize();
        }
      };
      window.addEventListener("resize", handleResize);
      // Clean up ECharts instance on component unmount
      return () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.dispose();
            chartInstanceRef.current = null; // Clear instance from ref
          }
          window.removeEventListener("resize", handleResize);
        };
      }
  }, [memberFees]);

  return <div className="grid md:col-span-1" ref={chartRef} style={{ width: "100%", height: "400px"}} />;
};

export default GenderPieChart;
