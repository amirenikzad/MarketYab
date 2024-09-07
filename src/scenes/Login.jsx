import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../authSlice";
import "../index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (loginState) {
      localStorage.clear();
      store.dispatch(logoutUser());
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;
    if (username.length === 0) {
      isProceed = false;
      toast.warn("Please enter an username");
    } else if (password.length < 3) {
      isProceed = false;
      toast.warn("Password must be at least 6 characters long");
    }
    return isProceed;
  };

  const proceedLogin = async (e) => {
    e.preventDefault();
    const link = "http://127.0.0.1:8000";
    if (isValidate()) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await fetch( `${link}/v1/admin_login`, {
            method: "POST", 
            body: formData,
        });
        console.log("loginState is 2 "+loginState);
        const data = await res.json();
        console.log("User data:", data.jwt);

        const foundUser = true;

        if (foundUser) {
          
          // localStorage.setItem("id", foundUser.id);
          // localStorage.setItem("jwt", data.jwt);
          // localStorage.setItem("link", link);
          
          // navigate("/");
          if (data.jwt) {
            localStorage.setItem("id", foundUser.id);
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("link", link);
            navigate("/");
            toast.success("Login successful");
            dispatch(loginUser());
          } else {
            toast.warn("Login failed: Unable to authenticate.");
          }
        } else {
          toast.warn("username or password is incorrect");
        }
      } catch (err) {
        toast.error("Login failed due to: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="logincontainer">
        <div >
          <div >
            <form  onSubmit={proceedLogin}>
            <label className="logincenter">
              ورود
              </label>
              <label className="loginlabel">
                E-mail
              </label>
              <input
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="logininput"
              />
              <label className="loginlabel">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="logininput"
              />
              <button
                type="submit"
                className={`transition duration-200 bg-emerald-300 hover:bg-emerald-200 focus:bg-emerald-300 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-stone-950 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : (
                    <span class="login-span">Login</span>
                    
                )}
              </button>
            </form>
          </div>
          <div >
            
          </div>
        </div>
      </div>
    </>
    
  );
  
};

export default Login;
