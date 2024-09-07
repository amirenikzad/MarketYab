import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between" textAlign={"center"} >
      <Box>
          <ProgressCircle progress={progress} />
        </Box>
        <Box >
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            style={{ fontFamily:"Dana", textAlignLast:"right"}}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
      <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
        <Typography variant="h7" sx={{ color: colors.greenAccent[200] }} style={{ fontFamily:"Dana"}} >
          {subtitle}
        </Typography>
        
      </Box>
    </Box>
  );
};

export default StatBox;
