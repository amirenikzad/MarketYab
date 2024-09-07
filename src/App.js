import "./App.css";
import './index.css'; 
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/dashboard/gloabal/Sidebar";
import Dashboard from "./scenes/dashboard";
import Orders from "./scenes/Orders";
import Faq from "./scenes/Faq";
import Calendar from "./scenes/Calendar";
import Reservation from "./scenes/Reservation";
import Login from "./scenes/Login";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function App() {
  const [theme, colorMode] = useMode();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={loginState ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/orders" element={loginState ? <Orders /> : <Navigate to="/login" />} />
              <Route path="/reservation" element={loginState ? <Reservation /> : <Navigate to="/login" />} />
              <Route path="/faq" element={loginState ? <Faq /> : <Navigate to="/login" />} />
              <Route path="/calendar" element={loginState ? <Calendar /> : <Navigate to="/login" />} />
            </Routes>
          </main>
          {loginState && <Sidebar />}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
