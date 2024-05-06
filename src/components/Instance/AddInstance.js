import React, { useState } from "react";
import API from "../../services/api";

const AddInstance = () => {
  const [instanceData, setInstanceData] = useState({
    name: "",
    host: "",
    port: "",
  });

  const handleChange = (e) => {
    setInstanceData({ ...instanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/instances", instanceData);
      console.log(response.data); // Handle successful instance addition
      // Optionally redirect or show success message
    } catch (error) {
      console.error(error.response.data); // Handle instance addition error
    }
  };

  return (
    <div>
      <h2>Add MongoDB Instance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Instance Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="host"
          placeholder="Host"
          onChange={handleChange}
        />
        <input
          type="number"
          name="port"
          placeholder="Port"
          onChange={handleChange}
        />
        <button type="submit">Add Instance</button>
      </form>
    </div>
  );
};

export default AddInstance;
