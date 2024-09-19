import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../data/mockData";
import { tokens } from "../theme";
function PieChart() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pie, setPie] = useState([]);

  useEffect(() => {
    const fetchPie = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const link  = localStorage.getItem("link");
        const response = await fetch(`${link}/v1/customers_pie_chart`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("pie data: ", data);
        if (!response.ok) {
          throw new Error("Failed to fetch pie");
        }
        setPie(data);
      } catch (error) {
        console.error("Error fetching pie:", error);
      }
    };
  
    fetchPie();
  }, []);

  return (
    <ResponsivePie
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
            },
          },
          interactive: {
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontFamily:"Dana",
            fontSize:"15px",
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
      data={data}//pie
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-22}
      innerRadius={0.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "loyal",
          },
          id: "dots",
        },
        {
          match: {
            id: "normal",
          },
          id: "dots",
        },
        {
          match: {
            id: "bad",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}

export default PieChart;
