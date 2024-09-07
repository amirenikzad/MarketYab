import React, { useEffect, useState } from "react";
import { Box, useTheme, GlobalStyles } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";

function Orders() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const link  = localStorage.getItem("link");
        const response = await fetch(`${link}/v1/admin_orders_list`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        console.log("token is :", token);
        console.log("responsee :", response);
        const data = await response.json();
        console.log("data me: ", data);
        console.log("order me: ", data.orders);

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);

  const columns = [
    {
      field: "status",
      headerName: "وضعیت",
      flex: 1,
      align: "right",
      headerAlign: "right",
      
    },
    {
      field: "order_date",
      headerName: "تاریخ",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "total_purchase_price",
      headerName: "مبلغ",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "store_name",
      headerName: "نام مغازه",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "order_id",
      headerName: "شناسه سفارش",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    // {
    //   field: "userId",
    //   headerName: "شناسه کاربر",
    //   type: "number",
    //   align: "right",
    //   headerAlign: "right",
    // },
    // {
    //   field: "sellerId",
    //   headerName: "شناسه فروشنده",
    //   flex: 1,
    //   cellClassName: "name-column--cell right",
    //   align: "right",
    //   headerAlign: "right",
    // },
    // {
    //   field: "id",
    //   headerName: "شناسه",
    //   align: "right",
    //   headerAlign: "right",
    // },
    
    
  ];
  return  (
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

    
    <Box m="0.5rem 1rem" >
      <Header
        title={<h2 style={{ alignContent:"right" ,fontSize:"40px", padding: "10px 10px 20px  980px", fontFamily:"Dana" }}  >سفارشات</h2>}
      />
      <Box
        margin="0.5rem 1rem"
        m="-2rem 0 0 0"
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
          rows={orders}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.order_id}
        />
      </Box>
    </Box>
    </>
  );
}

export default Orders;
