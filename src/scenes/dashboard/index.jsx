import { Box, useTheme, Typography } from "@mui/material";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import { mockTopShop, valuableCustomers, mostSellingItem } from "../../data/mockData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { tokens } from "../../theme";
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PieChart from "../../components/PieChart";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import React, { useState, useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ColorModeContext } from "../../theme";
import { IconButton } from '@mui/material';
import TopShops from '../../components/TopShops';


function Dashboard() {
  const theme = useTheme();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const theAmir = theme.palette.mode === "dark" ? "rgb(110 231 183)" : "rgb(6 95 70)";

  // const [data, setData] = useState({ id: "", title: "", progress: "", increase: "" });
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, [loginState, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      const link  = localStorage.getItem("link");
      const response = await fetch(`${link}/v1/admin_top_bar`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log("responsee :", response);
      console.log("result me: ", result);
      setData(result);
    };
    fetchData();
  }, []);

  const getDataById = (id) => {
    return data.find((item) => item.id == id);
  };
  return (
    <Box margin="0.5rem 1rem">
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ margin: "-60px 0px -40px 0px" }}>
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode} style={{ color: theAmir }}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined style={{ fontSize: "40px" }} />
            ) : (
              <DarkModeOutlined style={{ fontSize: "40px" }} />
            )}
          </IconButton>
        </Box>
        <img src=".\.\logo.svg" alt="Logo" style={{ transform: "scale(0.3)", padding: "0px 0px 0px 270px" }} />
        <Typography variant="h1" style={{ fontFamily:"Dana", fontSize: "40px", lineHeight: "0px", paddingLeft: "0px" }}>داشبورد</Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="1rem !important"
        gridAutoRows="minmax(100px, auto)"
      >
        {/* First Row */}
        
        <Box gridColumn="span 3" backgroundColor={colors.greenAccent[900]} display="flex" alignItems="center" justifyContent="center" >
          <StatBox
            title={getDataById(0)?.title}
            subtitle="مجموع فروش تومانی"
            progress={getDataById(0)?.progress}
            increase={getDataById(0)?.increase}
            icon={<svg style={{color:colors.greenAccent[300]}}
            class="ms-3" width="30" height="30" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="text-gray-880 dark:text-white" d="M1.14878 6.91843C1.44428 6.91843 1.70285 6.87142 1.92447 6.77739C2.15282 6.68337 2.34422 6.55577 2.49869 6.39458C2.65316 6.2334 2.77069 6.04535 2.85128 5.83044C2.93187 5.62224 2.97888 5.40062 2.99231 5.16556H1.98492C1.6424 5.16556 1.36033 5.12862 1.1387 5.05474C0.917077 4.98087 0.742461 4.87341 0.614858 4.73238C0.487254 4.59134 0.396588 4.42344 0.34286 4.22868C0.295849 4.0272 0.272343 3.80221 0.272343 3.55372C0.272343 3.29852 0.309281 3.05674 0.383156 2.8284C0.457032 2.60005 0.564488 2.39857 0.705523 2.22396C0.846559 2.04934 1.02117 1.91167 1.22937 1.81093C1.44428 1.70347 1.68941 1.64974 1.96477 1.64974C2.1864 1.64974 2.39795 1.68668 2.59943 1.76056C2.80091 1.83443 2.97888 1.95196 3.13335 2.11315C3.28782 2.26761 3.40871 2.47245 3.49601 2.72766C3.59004 2.97615 3.63705 3.27837 3.63705 3.63431V4.47045H4.60415C4.68474 4.47045 4.73847 4.50068 4.76533 4.56112C4.79891 4.61485 4.8157 4.6988 4.8157 4.81297C4.8157 4.93386 4.79891 5.02452 4.76533 5.08497C4.73847 5.13869 4.68474 5.16556 4.60415 5.16556H3.6169C3.60347 5.49464 3.53631 5.80693 3.41542 6.10244C3.30125 6.39794 3.14007 6.65651 2.93187 6.87813C2.72368 7.09976 2.47518 7.27438 2.1864 7.40198C1.89761 7.5363 1.57188 7.60346 1.20922 7.60346H0.141381L0.0809373 6.91843H1.14878ZM0.896929 3.51343C0.896929 3.68133 0.913719 3.82572 0.947299 3.94661C0.987594 4.0675 1.0514 4.16823 1.1387 4.24883C1.23273 4.3227 1.35697 4.37979 1.51144 4.42008C1.66591 4.45366 1.86067 4.47045 2.09573 4.47045H3.00239V3.71491C3.00239 3.21792 2.90501 2.86198 2.71024 2.64707C2.51548 2.43215 2.24684 2.3247 1.90433 2.3247C1.58196 2.3247 1.33347 2.43215 1.15885 2.64707C0.984237 2.86198 0.896929 3.15076 0.896929 3.51343ZM6.26895 4.47045C6.35626 4.47045 6.41335 4.50068 6.44021 4.56112C6.47379 4.61485 6.49058 4.6988 6.49058 4.81297C6.49058 4.93386 6.47379 5.02452 6.44021 5.08497C6.41335 5.13869 6.35626 5.16556 6.26895 5.16556H4.60675C4.51944 5.16556 4.46235 5.13869 4.43549 5.08497C4.40191 5.03124 4.38512 4.94729 4.38512 4.83312C4.38512 4.71223 4.40191 4.62156 4.43549 4.56112C4.46235 4.50068 4.51944 4.47045 4.60675 4.47045H6.26895ZM7.93155 4.47045C8.01886 4.47045 8.07594 4.50068 8.10281 4.56112C8.13639 4.61485 8.15318 4.6988 8.15318 4.81297C8.15318 4.93386 8.13639 5.02452 8.10281 5.08497C8.07594 5.13869 8.01886 5.16556 7.93155 5.16556H6.26935C6.18204 5.16556 6.12495 5.13869 6.09809 5.08497C6.06451 5.03124 6.04772 4.94729 6.04772 4.83312C6.04772 4.71223 6.06451 4.62156 6.09809 4.56112C6.12495 4.50068 6.18204 4.47045 6.26935 4.47045H7.93155ZM9.59415 4.47045C9.68146 4.47045 9.73854 4.50068 9.76541 4.56112C9.79899 4.61485 9.81578 4.6988 9.81578 4.81297C9.81578 4.93386 9.79899 5.02452 9.76541 5.08497C9.73854 5.13869 9.68146 5.16556 9.59415 5.16556H7.93194C7.84464 5.16556 7.78755 5.13869 7.76069 5.08497C7.72711 5.03124 7.71032 4.94729 7.71032 4.83312C7.71032 4.71223 7.72711 4.62156 7.76069 4.56112C7.78755 4.50068 7.84464 4.47045 7.93194 4.47045H9.59415ZM11.2567 4.47045C11.3441 4.47045 11.4011 4.50068 11.428 4.56112C11.4616 4.61485 11.4784 4.6988 11.4784 4.81297C11.4784 4.93386 11.4616 5.02452 11.428 5.08497C11.4011 5.13869 11.3441 5.16556 11.2567 5.16556H9.59454C9.50723 5.16556 9.45015 5.13869 9.42328 5.08497C9.3897 5.03124 9.37291 4.94729 9.37291 4.83312C9.37291 4.71223 9.3897 4.62156 9.42328 4.56112C9.45015 4.50068 9.50723 4.47045 9.59454 4.47045H11.2567ZM12.1638 4.47045C12.4257 4.47045 12.6339 4.39994 12.7884 4.2589C12.9496 4.11787 13.0302 3.9231 13.0302 3.67461V2.2844H13.685V3.67461C13.685 4.15144 13.5506 4.52082 13.282 4.78275C13.0201 5.03795 12.6608 5.16556 12.2041 5.16556H11.2571C11.1698 5.16556 11.1127 5.13869 11.0859 5.08497C11.0523 5.03124 11.0355 4.94729 11.0355 4.83312C11.0355 4.71223 11.0523 4.62156 11.0859 4.56112C11.1127 4.50068 11.1698 4.47045 11.2571 4.47045H12.1638ZM13.7857 0.994934H12.9798V0.279683H13.7857V0.994934ZM12.5063 0.994934H11.7004V0.279683H12.5063V0.994934ZM5.64177 12.9641C5.64177 13.3267 5.58468 13.6659 5.47051 13.9815C5.35634 14.3039 5.1918 14.5826 4.97689 14.8177C4.76198 15.0595 4.50005 15.2509 4.19112 15.3919C3.8889 15.5329 3.54638 15.6035 3.16357 15.6035H2.56921C1.81702 15.6035 1.23273 15.3718 0.816337 14.9084C0.399946 14.445 0.191751 13.8103 0.191751 13.0044V11.2414H0.836485V12.9842C0.836485 13.273 0.870065 13.5349 0.937225 13.77C1.0111 14.0051 1.12191 14.2065 1.26967 14.3744C1.42413 14.549 1.61554 14.6834 1.84388 14.7774C2.07223 14.8714 2.34758 14.9184 2.66995 14.9184H3.1132C3.42885 14.9184 3.70421 14.8647 3.93927 14.7572C4.17433 14.6565 4.36909 14.5188 4.52356 14.3442C4.68474 14.1696 4.80227 13.9648 4.87615 13.7297C4.95674 13.4946 4.99703 13.2495 4.99703 12.9943V10.2844H5.64177V12.9641ZM3.21394 10.0628H2.36773V9.32738H3.21394V10.0628ZM8.24526 13.1656C8.07064 13.1656 7.90274 13.1421 7.74156 13.095C7.58038 13.0413 7.43598 12.954 7.30838 12.8331C7.18749 12.7122 7.09011 12.5544 7.01624 12.3596C6.94236 12.1582 6.90542 11.9097 6.90542 11.6142V6.9197H7.56023V11.4933C7.56023 11.7754 7.62067 12.0104 7.74156 12.1985C7.86916 12.3798 8.074 12.4705 8.35607 12.4705H8.52733C8.67508 12.4705 8.74896 12.5846 8.74896 12.813C8.74896 13.048 8.67508 13.1656 8.52733 13.1656H8.24526ZM8.69324 12.4705C8.95516 12.4705 9.15328 12.4067 9.2876 12.279C9.42192 12.1514 9.48908 11.9802 9.48908 11.7653V11.3825C9.48908 10.7982 9.63683 10.3415 9.93233 10.0124C10.2346 9.68332 10.6509 9.51878 11.1815 9.51878C11.4569 9.51878 11.6986 9.56243 11.9068 9.64974C12.115 9.73705 12.2863 9.8613 12.4206 10.0225C12.5616 10.1837 12.6657 10.3751 12.7329 10.5967C12.8001 10.8183 12.8336 11.0635 12.8336 11.3321C12.8336 11.9097 12.6825 12.3596 12.3803 12.682C12.0781 13.0044 11.6651 13.1656 11.1412 13.1656C10.8726 13.1656 10.614 13.1152 10.3655 13.0144C10.117 12.907 9.92226 12.7189 9.78123 12.4503C9.72078 12.6048 9.64691 12.729 9.5596 12.823C9.47229 12.9171 9.38162 12.9909 9.2876 13.0447C9.19358 13.0917 9.09284 13.1253 8.98538 13.1454C8.88464 13.1588 8.78726 13.1656 8.69324 13.1656H8.53205C8.44475 13.1656 8.38766 13.1387 8.3608 13.085C8.32722 13.0312 8.31043 12.9473 8.31043 12.8331C8.31043 12.7122 8.32722 12.6216 8.3608 12.5611C8.38766 12.5007 8.44475 12.4705 8.53205 12.4705H8.69324ZM12.1889 11.3925C12.1889 11.0433 12.1117 10.7612 11.9572 10.5463C11.8027 10.3247 11.5375 10.2139 11.1614 10.2139C10.4629 10.2139 10.1137 10.6202 10.1137 11.4328C10.1137 11.7754 10.2077 12.0339 10.3957 12.2085C10.5905 12.3831 10.839 12.4705 11.1412 12.4705C11.4837 12.4705 11.7423 12.3764 11.9169 12.1884C12.0982 12.0003 12.1889 11.7351 12.1889 11.3925Z" fill="currentColor"></path>
            </svg>}
          />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.greenAccent[900]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={getDataById(1)?.title}
            subtitle="تعداد کل سفارشات"
            progress={getDataById(1)?.progress}
            increase={getDataById(1)?.increase}
            icon={<ShoppingCartIcon sx={{ color: colors.greenAccent[300], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.greenAccent[900]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={getDataById(2)?.title}
            subtitle="مشتریان تازه"
            progress={getDataById(2)?.progress}
            increase={getDataById(2)?.increase}
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[300], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.greenAccent[900]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="562"
            subtitle="اضافه‌شده به علاقه‌مندی"
            progress="1.2"
            increase="+20%"
            icon={<FavoriteIcon sx={{ color: colors.greenAccent[300], fontSize: "26px" }} />}
          />
        </Box>

        {/* Second Row */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.greenAccent[900]} height="50vh !important">
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" fontSize={30} color={colors.grey[100]} style={{ fontSize: "19px", paddingLeft: "460px", fontFamily:"Dana"}}>
              تعداد سفارشات در رویدادها
            </Typography>
          </Box>
          <Box height="290px !important" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.greenAccent[900]} height="50vh !important" overflow="auto !important" className="transaction-container">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} colors={colors.grey[100]} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600" style={{ fontSize: "17px", paddingLeft: "210px", fontFamily:"Dana"}}>
              فروشگاه‌های برتر
            </Typography>
          </Box>
          {/* {mockTopShop.map((transaction, i) => (
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
          ))} */}
          <TopShops />
        </Box>
        {/* third row */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.greenAccent[900]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" style={{ fontSize:"23px",paddingLeft: "250px" , fontFamily:"Dana"}}>
            رزرو‌ها
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[300]}
              sx={{ mt: "15px" }}
              fontSize={25}
              style={{ fontFamily:"Dana"}}
            >
              413
            </Typography>
            <Typography fontSize={18} fontFamily={"Dana"} marginTop={"20px"}>رزرو‌هایی که هنوز سفارش داده نشده‌اند</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.greenAccent[900]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
            style={{ fontSize:"22px",paddingLeft: "550px" , fontFamily:"Dana"}}
          >
            تعداد سفارشات
          </Typography>
          <Box height="320px" mt="-20px" > 
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/*                      most Selling Item                      */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.greenAccent[900]}
          overflow="auto !important"
          className="transaction-container"
          height="500px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600" style={{ fontSize:"20px",paddingLeft: "165px" , fontFamily:"Dana"}}>
              محصولات پرفروش
            </Typography>
          </Box>
          {mostSellingItem.map((product, i) => (
            <Box
              key={`${product.name}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box
                backgroundColor={colors.greenAccent[300]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${product.cost}
              </Box>
              
              <Box color={colors.grey[100]}>{product.count}</Box>
              <Box textAlign={"right"}>
                <Typography
                  color={colors.greenAccent[300]}
                  variant="h5"
                  fontWeight="600"
                  style={{ fontFamily:"Dana"}}
                >
                  {product.name}
                </Typography>
                <Typography color={colors.grey[100]} style={{ fontFamily:"Dana"}} variant="h8">
                  {product.category}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.greenAccent[900]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
            fontSize={25}
            style={{ fontSize:"22px",paddingLeft: "220px" , fontFamily:"Dana"}}
          >
            مشتریان
          </Typography>
          <Box height="400px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
          {/*                      value customer                      */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.greenAccent[900]}
          overflow="auto !important"
          className="transaction-container"
          height="500px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600" style={{ fontSize:"20px",paddingLeft: "180px" , fontFamily:"Dana"}}>
              مشتریان ارزشمند
            </Typography>
          </Box>
          {valuableCustomers.map((value, i) => (
            <Box
              key={`${value.name}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box
                backgroundColor={colors.greenAccent[300]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${value.payment}
              </Box>
              <Box color={colors.grey[100]}>{value.order}</Box>
              
              <Box>
                <Typography
                  color={colors.greenAccent[300]}
                  variant="h5"
                  fontWeight="600"
                  fontFamily={"Dana"}
                >
                  {value.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
}

export default Dashboard;
