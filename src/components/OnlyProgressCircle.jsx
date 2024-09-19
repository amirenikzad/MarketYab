import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";

const OnlyProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
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
      style={{ fontFamily:"Dana"}}
    >
    {/* {deliverynumber !== null ? deliverynumber : "در حال دریافت..."} */}
    413
    </Typography>
    </>

  );
};

export default OnlyProgressCircle;
