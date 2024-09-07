import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataReservation } from "../data/mockData";

import Header from "../components/Header";
function Reservation() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "status",
      headerName: "وضعیت",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "credit",
      headerName: "اعتبار",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    
    {
      field: "leftTime",
      headerName: "زمان باقی مانده",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "reserveId",
      headerName: "شناسه رزرو",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "userId",
      headerName: "شناسه کاربر",
      type: "number",
      align: "right",
      headerAlign: "right",
    },
    {
      field: "sellerId",
      headerName: "شناسه فروشنده",
      flex: 1,
      cellClassName: "name-column--cell right",
      align: "right",
      headerAlign: "right",
    },
    {
      field: "id",
      headerName: "شناسه",
      align: "right",
      headerAlign: "right",
    },
    
    
  ];
  return (
    <Box m="0.5rem 1rem">
      <Header
        title={<h2 style={{ alignContent:"right" ,fontSize:"40px", padding: "10px 10px 10px  1015px"}}  >رزرو‌ها</h2>}
      />
      <Box
        margin="0.5rem 1rem"
        m="-1rem  0 0 0"
        height="85vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.greenAccent[900],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          
          rows={mockDataReservation}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

export default Reservation;
