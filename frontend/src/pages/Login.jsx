import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //console.log({ email, password });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3005/user/login", {
        email,
        password,
      });
      const fullname = response.data?.user?.fullname;
      //console.log(fullname);
      sessionStorage.setItem("fullname", JSON.stringify(fullname));

      navigate("/userdetails");
    } catch (error) {
      alert("Something is Wrong");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="float-end">
        Don't have an account?
        <Link to={"/signup"} className=" btn btn-primary btn-sm m-2 ">
          Sign Up
        </Link>
      </div>

      <div className="mx-auto col-7 col-md-8 col-lg-6  pt-5 mt-5 bt-5 ">
        <form className="p-3 bg-light rounded-3" onSubmit={onSubmit}>
          <h4 className="text-center pb-3">Welcome Back!</h4>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              className="form-control"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 col-11 "
            >
              Log in
            </button>
          </div>
        </form>
        <div className="col text-center pt-5 ">
          <a href="#!" className="text-white">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
