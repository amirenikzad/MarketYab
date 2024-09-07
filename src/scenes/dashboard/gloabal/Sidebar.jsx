import React from "react";
import { Sidebar as MySidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from "react";
import { Link } from "react-router-dom";
import userImage from "../../../assets/images/user.jpg";
import LogoutIcon from '@mui/icons-material/Logout';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    < >
    <Typography style={{ paddingTop: "10px", position:"absolute", paddingLeft:"90px", fontSize:"17px" ,fontFamily:"Danat", fontWeight:"bolder" }}>{title}</Typography>
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        alignContent:"right" ,
        // alignItems:"start",
        paddingLeft: "150px",
        
        
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
      
    >
      <Link to={to} />
      

      
    </MenuItem>
    </>
  );
};

function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  return (
    <div className="sidebar">
      <Box
        sx={{
          "& .pro-sidebar": {
            backgroundColor: "black !important",
          },
          "& .pro-sidebar-inner": {
            backgroundColor: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
          },
          "& .pro-inner-item:hover": {
        
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
          "& .ps-menuitem-root:hover": {
            color: "yellow !important",
          },
        }}
      >
        <MySidebar
          
          collapsed={isCollapsed}
          backgroundColor={colors.greenAccent[900]}//primary[400] 
          height="260vh"
          
        >
          <Menu
            
            iconShape="square"
            menuItemStyles={{
              button: {
                
                [`&:hover`]: {
                  backgroundColor: colors.greenAccent[400],
                  
                },
                [`&.active`]: {
                  backgroundColor: "#fff",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    src={userImage}
                    alt="user-profile"
                    width="100px"
                    height="100px"
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      margin:"50px 20px 20px 20px"
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                    style={{ fontFamily:"Dana"}}
                  >
                    امیر نیکزاد
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="400"
                    color={colors.greenAccent[500]}
                  >
                    <Typography variant="h4" style={{ fontFamily:"Dana"}}>مدیر</Typography>
                    
                  </Typography>
                </Box>
              </Box>
            )}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}  align="right" ali height={"65vh"} >
              <Item
                title="داشبورد"
                to="/"
                icon={<HomeOutlinedIcon  />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h2"
                color={colors.greenAccent[200]}
                sx={{ m: "15px 0px 5px 20px" }}
                paddingRight={"40px"}
                style={{ fontFamily:"Dana", fontWeight:"bolder"}}
              >
                داده‌ها
              </Typography>
              <Item
                title="سفارشات"
                to="/orders"
                icon={<ShoppingCartIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="رزرو‌ها"
                to="/reservation"
                icon={<BookmarkIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h2"
                color={colors.greenAccent[200]}
                sx={{ m: "15px 0px 5px 20px" }}
                paddingRight={"40px"}
                style={{ fontFamily:"Dana", fontWeight:"bolder"}}
              >
                صفحات
              </Typography>
              
              <Item
                title="رویداد‌‌ها"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="سوالات"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              <Typography
                variant="h2"
                color={colors.greenAccent[200]}
                sx={{ m: "15px 0px 5px 20px" }}
                paddingRight={"40px"}
                style={{ fontFamily:"Dana", fontWeight:"bolder"}}
              >
                حساب کاربری
              </Typography>
              <Item
                title="خروج"
                to="/login"
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}

              />
            </Box>
          </Menu>
        </MySidebar>
      </Box>
    </div>
  );
}

export default Sidebar;
