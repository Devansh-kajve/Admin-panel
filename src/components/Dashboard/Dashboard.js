import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import DatabaseList from "../Database/Database";

const Dashboard = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", loginData);
      console.log(response.data); // Handle successful login
      // Redirect or set login success message
    } catch (error) {
      console.error(error.response.data); // Handle login error
      setLoginError(error.response.data.message || "An error occurred");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/signup", signupData);
      console.log(response.data); // Handle successful signup
      setSignupSuccess("Signup successful. You can now login.");
    } catch (error) {
      console.error(error.response.data); // Handle signup error
      setSignupSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>

      {/* Login Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Login</h3>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleLoginChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              {loginError && <p className="text-danger mt-3">{loginError}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Signup</h3>
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleSignupChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Signup
                </button>
              </form>
              {signupSuccess && (
                <p className="text-success mt-3">{signupSuccess}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other Dashboard Content */}
      <div className="mt-5">
        {/* Display instances, databases, users */}
        <DatabaseList />

        <div className="mt-4">
          <Link to="/instances" className="btn btn-info me-2">
            Manage Instances
          </Link>
          <Link to="/add-instance" className="btn btn-primary">
            Add Instance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
