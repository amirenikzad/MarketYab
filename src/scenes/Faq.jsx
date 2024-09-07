import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import { Box, useTheme, Typography, GlobalStyles } from "@mui/material";

function Faq() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    
    <Box m="0.5rem 1rem">
      <h1 style={{ textAlign:"right" , fontSize:"30px", paddingLeft: "780px" , margin: "15px 20px 20px 0px" }} >سوالات متداول</h1>
      <Accordion
        sx={{
          mt: "1rem",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]} style={{  fontSize:"20px", paddingLeft: "740px" ,fontFamily: "Dana"}}>
          چگونه می‌توانم گزارش‌ها را دانلود کنم؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" color={colors.grey[100]} style={{  textAlign:"right",fontSize:"20px", paddingLeft: "-10px" ,fontFamily: "Dana"}} >
          در بخش گزارش‌ها، یک دکمه دانلود وجود دارد که به شما اجازه می‌دهد گزارش‌های مختلف را دانلود کنید
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          mt: "0.5rem",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]} style={{  fontSize:"20px", paddingLeft: "670px",fontFamily: "Dana" }}>
          چگونه با جدول‌های رزروها و سفارشات کارکنیم؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "350px",fontFamily: "Dana" }}>
          جدول‌ها شامل داده‌هایی است که می‌توانید آن‌ها را بر اساس هر ستون مرتب یا فیلتر کنید
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          mt: "0.5rem",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]} style={{  fontSize:"20px", paddingLeft: "720px",fontFamily: "Dana" }}>
          نمودارها چه چیزهایی را توضیح می دهد؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "130px" ,fontFamily: "Dana"}} >
          نمودارهای خطی: این نمودارها روند تغییرات یک داده خاص (مثلاً تعداد کاربران فعال) را در طول زمان نشان می‌دهند

          </Typography>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "150px" ,fontFamily: "Dana"}} >
          نمودارهای میله‌ای: این نمودارها مقایسه مقادیر مختلف را نمایش می‌دهند، مثل مقایسه فروش در ماه‌های مختلف

          </Typography>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "230px" ,fontFamily: "Dana"}} >
          نمودارهای دایره‌ای : این نمودارها توزیع درصدی داده‌ها را نشان می‌دهند، مثلاً درصد کاربران در هر منطقه
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          mt: "0.5rem",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]} style={{  fontSize:"20px", paddingLeft: "570px" ,fontFamily: "Dana"}}>
            بازه زمانی که جدول‌ها به ما آمار را نشان میدهد چقدر است؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "0px" ,fontFamily: "Dana"}}>
            جدول‌هایی که رویداد یا زمانی برای داده خود تعیین نکردند براساس روز است. مثل :اضافه شدن به علاقه‌مندی و مشتریان تازه و غیره
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          mt: "0.5rem",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]} style={{  fontSize:"20px", paddingLeft: "655px",fontFamily: "Dana" }}>
            تفاوت بین مشتری عادی و بدنام و وفادار چیست؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "510px",fontFamily: "Dana" }}>
            مشتری بدنام به معنای داشتن اعتبار خیلی کم به علت بدقولی و... است 
          </Typography>
          <Typography variant="h6" color={colors.grey[100]} style={{  fontSize:"20px", paddingLeft: "440px",fontFamily: "Dana" }}>
            و مشتری وفادار به معنای اعتبار خیلی زیاد و مشتری عادی مابین این حدود است
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    </>
  );
}

export default Faq;
