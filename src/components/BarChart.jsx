import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [barchart, setBarchart] = useState([]);

  useEffect(() => {
    const fetchBarchart = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const link  = localStorage.getItem("link");
        const response = await fetch(`${link}/v1/test`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Barchart data: ", data);
        
        if (!response.ok) {
          throw new Error("Failed to fetch Barchart");
        }
        setBarchart(data);
      } catch (error) {
        console.error("Error fetching Barchart:", error);
      }
    };
  
    fetchBarchart();
  }, []);

  return (
    <ResponsiveBar
      data={data}//barchart
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
              fontFamily:"Dana",
              fontSize:"12px",
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontFamily:"Dana",
            fontSize:"10px",
          },
        },
        interactive: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.blueAccent[500],
            fontSize: 12,
          },
          text: {
            fill: colors.grey[100],
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        },
      }}
      keys={["کنسروجات","محصولات پروتئینی","میوه","خشکبار","نان","سایر"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "month", 
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", 
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in month: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
