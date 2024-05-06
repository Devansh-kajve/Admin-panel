import React, { useState } from "react";
import API from "../../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/signup", formData);
      console.log(response.data); // Handle successful signup
    } catch (error) {
      console.error(error.response.data); // Handle signup error
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
