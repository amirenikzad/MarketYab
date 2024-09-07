import React, { useEffect, useState } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from '../theme';



const TopShops = () => {
  const [topShops, setTopShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchTopShops = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const link  = localStorage.getItem("link");
      const response = await fetch(`${link}/v1/admin_orders_list`);
      console.log("token is :", token);
      console.log("responsee :", response);
      const data = await response.json();
      console.log("data me: ", data);
      console.log("order me: ", data.orders);
      setTopShops(data);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopShops();
  }, []);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>خطا: {error}</div>;
  }

  return (
    <div>
      {/* {topShops.length > 0 ? (
        topShops.map((shop) => (
          <div key={shop.id}>
            <h3>{shop.name}</h3>
            <p>{shop.description}</p>
          </div>
        ))
      ) : (
        <p>هیچ فروشگاهی موجود نیست.</p>
      )} */}
      {topShops.map((transaction, i) => (
            <Box key={`${transaction.shopName}-${i}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Box backgroundColor={colors.greenAccent[300]} p="5px 10px" borderRadius="4px">${transaction.cost}</Box>
              
              <Box color={colors.grey[100]}>{transaction.shopCount}</Box>
              <Box textAlign={"right"}>
                <Typography color={colors.greenAccent[300]} variant="h5" fontWeight="600" style={{ fontFamily:"Dana"}}>
                  {transaction.shopName}
                </Typography>
                <Typography color={colors.grey[100]} style={{ fontFamily:"Dana"}} variant="h8">{transaction.shopCategory}</Typography>
              </Box>
            </Box>
          ))}
    </div>
  );
};

export default TopShops;
