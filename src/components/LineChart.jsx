import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { mockLineData as data } from "../data/mockData";
import { tokens } from "../theme";
import { useTheme, GlobalStyles } from "@mui/material";
function LineChart() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [linechart, setLinechart] = useState([]);

  useEffect(() => {
    const fetchLinechart = async () => {
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
        console.log("Linechart data: ", data);
        if (!response.ok) {
          throw new Error("Failed to fetch Linechart");
        }
        setLinechart(data);
      } catch (error) {
        console.error("Error fetching Linechart:", error);
      }
    };
  
    fetchLinechart();
  }, []);

  return (
    <>
    <GlobalStyles
          styles={{
            body: {
              fontFamily: "Dana, sans-serif",
            },
            "*": {
              fontFamily: "Dana, sans-serif",
            },
          }}
        />
    <ResponsiveLine
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
              fontFamily:"Dana",
            fontSize:"13px",
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
            fontSize:"10px",
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
            background: colors.blueAccent[900],
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
      data={data}//linechart
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "دسته‌بندی کالا‌ها",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "تعداد",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    </>
  );
}

export default LineChart;
