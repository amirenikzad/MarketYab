import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

const ProgressCircle = ({ size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [progress, setProgress] = useState();
  const [deliveryNumber, setDeliveryNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
      const link  = localStorage.getItem("link");
      const response = await fetch(`${link}/v1/admin_today_completed_orders`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
        const data = await response.json();
        console.log("progress data me: ", data);
        setProgress(data.progress);
        setDeliveryNumber(data.deliveryNumber); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const angle = progress * 360;
  const angle = 0.4 * 360;
  return (
    <>
      <Box
        sx={{
          background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <Typography
        variant="h5"
        color={colors.greenAccent[300]}
        sx={{ mt: "15px" }}
        fontSize={25}
        style={{ fontFamily: "Dana" }}
      >
        324
        {/* {deliveryNumber !== null ? deliveryNumber : "در حال دریافت..."} */}
      </Typography>
    </>
  );
};

export default ProgressCircle;
