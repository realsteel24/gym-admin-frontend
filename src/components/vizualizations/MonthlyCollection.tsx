import { MemberFeeOptions } from "@/hooks";
import * as echarts from "echarts";
import { useRef, useEffect } from "react";

export const MonthlyCollection = ({
  memberFeesLoading,
  memberFees,
}: {
  memberFeesLoading: boolean;
  memberFees: MemberFeeOptions[];
}) => {
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = echarts.init(document.getElementById("main")!);
    }
  }, []);

  useEffect(() => {
    if (chartRef.current && !memberFeesLoading) {
      // Define all months from January to December
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      const currentYear = new Date().getFullYear();

      // Group payments by month for the current year
      const paymentsByMonth = months.reduce<{ [key: string]: number }>(
        (acc, month) => {
          acc[month] = 0;
          return acc;
        },
        {}
      );

      memberFees.forEach((fee: MemberFeeOptions) => {
        const date = new Date(fee.paidDate);
        if (date.getFullYear() === currentYear) {
          const monthName = months[date.getMonth()];
          paymentsByMonth[monthName] += Number(fee.Payments[0].amount);
        }
      });

      const option = {
        
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params: { value: number; name: string }[]) {
            const payment = params[0].value;
            return `${params[0].name}: ${payment}`;
          },
        },
          xAxis: {
              type: "category",
              data: months,
          axisLabel: {
            interval: "auto", // Display all labels
           
            },
          
        },
        yAxis: {
            type: "value",
            axisLabel: {
                align: "center",
            
            },
            offset: 10
          },
        series: [
          {
            data: months.map((month) => ({
              name: month,
                value: paymentsByMonth[month],
            
            })),
                type: "bar",
            barWidth: "60%",
                color: "#AAFF00",
               
            
          },
          ],
          grid: {
              right: "5%",
            left: "10%"
        }
      };
      chartRef.current.setOption(option);
    }
  }, [memberFeesLoading, memberFees]);

  return (
    <div
      id="main"
      style={{ width: "100%", height: "400px"}}
      className="col-span-1 md:col-span-3 mt-4"
    ></div>
  );
};
