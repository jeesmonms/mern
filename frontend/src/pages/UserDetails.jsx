import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fullname = JSON.parse(sessionStorage.getItem("fullname"));
    if (!fullname) {
      navigate("/");
      return;
    }
    setFullname(fullname);
  }, []);

  const logout = () => {
    sessionStorage.clear();

    navigate("/");
  };

  const getUserDetails = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/user/userdetails",
        {
          fullname,
        }
      );
      //console.log(response.data?.email);
      setEmail(response.data?.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="float-end">
        Hi {fullname}
        <button onClick={logout} className=" btn btn-primary btn-sm m-2 ">
          Log Out
        </button>
      </div>
      <div className="mx-auto col-7 col-md-8 col-lg-6 text-center">
        <h4 className=" pt-5 mt-5 bt-5">Name your Organisation</h4>
        <input type="text" className="col-8 mt-5 form-control shadow" />
        <h5 className="mt-5 mb-5">Select your Organisation Type Below</h5>

        <div className="row">
          <div className="col-md-3 p-4 py-5  b-2 shadow">+</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">construction</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">education</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">consultancy</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">Logistics</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">manufacturing</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">tourism</div>
          <div className="col-md-3 p-4 py-5  b-2 shadow">IT</div>
          <div className="text-center">
            <button
              className="btn btn-primary col-2 mt-5"
              onClick={getUserDetails}
            >
              Get User Details
            </button>
            <p>Your Email : {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
