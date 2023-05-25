import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //console.log({ fullname, email, password });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3005/user/signup", {
        fullname,
        email,
        password,
      });
      alert("Sign Up Success, Please Login");
      navigate("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="container-fluid">
      <div className="float-end">
        Already have an account?
        <Link to={"/"} className=" btn btn-primary btn-sm m-2 ">
          Log In
        </Link>
      </div>

      <div className="mx-auto col-7 col-md-8 col-lg-6  pt-5 mt-5 bt-5 ">
        <form className="p-3 bg-light rounded-3" onSubmit={onSubmit}>
          <h4 className="text-center pb-3">Let's Go!</h4>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="fullname">
              Full Name
            </label>
            <input
              required
              type="fullname"
              id="fullname"
              className="form-control"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              Choose Password
            </label>
            <input
              required
              type="password"
              id="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 col-11"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
