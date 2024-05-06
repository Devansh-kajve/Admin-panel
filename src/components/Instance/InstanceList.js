import React, { useEffect, useState } from "react";
import API from "../../services/api";

const InstanceList = () => {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await API.get("/instances");
        setInstances(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchInstances();
  }, []);

  return (
    <div>
      <h2>Connected MongoDB Instances</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Host</th>
            <th>Port</th>
            <th>Databases</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance._id}>
              <td>{instance.name}</td>
              <td>{instance.host}</td>
              <td>{instance.port}</td>
              <td>{instance.numDatabases}</td>
              <td>{instance.numUsers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstanceList;
