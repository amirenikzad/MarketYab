import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (email.length === 0) {
      isProceed = false;
      toast.warn("Please enter a email");
    } else if (password.length < 6) {
      isProceed = false;
      toast.warn("Password must be minimum 6 characters");
    }
    return isProceed;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (isValidate()) {
      fetch("http://localhost:8080/user")
        .then((res) => res.json())
        .then((res) => {
          let data = res;
          const foundUser = data.filter(
            (item) => item.email === email && item.password === password
          );
          if (foundUser[0]) {
            toast.success("Login successful");
            localStorage.setItem("id", foundUser[0].id);
            store.dispatch(loginUser());
            navigate("/");
          } else {
            toast.warn("Email or password is incorrect");
          }
        })
        .catch((err) => {
          toast.error("Login failed due to: " + err.message);
        });
    }
  };

  return (
    <>
      <SectionTitle title="ورود" path="" />
      <div className="flex flex-col justify-center sm:py-12 ">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border  shadow w-full rounded-lg   ">
            <form className="px-5 py-7 bg-emerald-100" onSubmit={proceedLogin}>
              <label className="font-semibold text-sm pb-1 block text-stone-950">
                E-mail
              </label>
              <input
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-stone-950 bg-emerald-300"
              />
              <label className="font-semibold text-sm pb-1 block text-stone-950">
                Password
              </label>
              <input
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-stone-900 bg-emerald-300"
              />
              <button
                type="submit"
                className="transition duration-200 bg-emerald-300 hover:bg-emerald-200 focus:bg-emerald-300 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-stone-950 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/register"
              className="btn btn-emerald-100 bg-emerald-300 hover:bg-emerald-200 text-slate-950"
              onClick={() => window.scrollTo(0, 0)}
            >
              Don't have an account? Please register.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
