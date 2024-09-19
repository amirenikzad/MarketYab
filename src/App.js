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
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/" element={ <Dashboard /> } />
              <Route path="/orders" element={ <Orders />} />
              <Route path="/reservation" element={ <Reservation />} />
              <Route path="/faq" element={ <Faq />} />
              <Route path="/calendar" element={ <Calendar />} />
            </Routes>
          </main>
          {<Sidebar />}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
