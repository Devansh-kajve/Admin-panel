import React, { useState, useEffect } from "react";
import API from "../../services/api";
import UserList from "../User/UserManagement";

const DatabaseManagement = () => {
  const [instances, setInstances] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [databases, setDatabases] = useState([]);
  const [newDatabaseName, setNewDatabaseName] = useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [userToAssign, setUserToAssign] = useState(null);
  const [databaseToAssign, setDatabaseToAssign] = useState(null);

  // Fetch instances, databases, and users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const instancesResponse = await API.get("/instances");
        setInstances(instancesResponse.data);

        if (selectedInstance) {
          const databasesResponse = await API.get(
            `/instances/${selectedInstance}/databases`
          );
          setDatabases(databasesResponse.data);

          const usersResponse = await API.get(
            `/instances/${selectedInstance}/users`
          );
          setUsers(usersResponse.data);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchData();
  }, [selectedInstance]);

  // Fetch instances and databases on component mount
  useEffect(() => {
    const fetchInstancesAndDatabases = async () => {
      try {
        const instancesResponse = await API.get("/instances");
        setInstances(instancesResponse.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchInstancesAndDatabases();
  }, []);

  // Fetch databases and users based on selectedInstance
  useEffect(() => {
    const fetchDatabasesAndUsers = async () => {
      try {
        if (selectedInstance) {
          const databasesResponse = await API.get(
            `/instances/${selectedInstance}/databases`
          );
          setDatabases(databasesResponse.data);

          const usersResponse = await API.get(
            `/instances/${selectedInstance}/users`
          );
          setUsers(usersResponse.data);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchDatabasesAndUsers();
  }, [selectedInstance]);

  // Handler for adding a new instance
  const handleAddInstance = async (instanceName) => {
    try {
      const response = await API.post("/instances", { name: instanceName });
      console.log(response.data); // Handle successful instance addition
      setInstances([...instances, response.data]); // Update instances state
    } catch (error) {
      console.error(error.response.data); // Handle instance addition error
    }
  };

  // Handler for adding a new database
  const handleAddDatabase = async () => {
    try {
      const response = await API.post(
        `/instances/${selectedInstance}/databases`,
        { name: newDatabaseName }
      );
      console.log(response.data); // Handle successful database addition
      setNewDatabaseName(""); // Clear input field after addition
      setDatabases([...databases, response.data]); // Update databases state
    } catch (error) {
      console.error(error.response.data); // Handle database addition error
    }
  };

  // Handler for removing a database
  const handleRemoveDatabase = async (databaseId) => {
    try {
      const response = await API.delete(
        `/instances/${selectedInstance}/databases/${databaseId}`
      );
      console.log(response.data); // Handle successful database removal
      setDatabases(databases.filter((database) => database._id !== databaseId)); // Update databases state
    } catch (error) {
      console.error(error.response.data); // Handle database removal error
    }
  };

  return (
    <div className="container mt-5">
      <h2>Instance Management</h2>
      <div className="row">
        {/* <div className="col-md-4">
          <h4>New Instance</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Instance Name"
          />
          <button className="btn btn-primary" onClick={handleAddInstance}>
            Add Instance
          </button>
        </div> */}
        <div className="col-md-8">
          <h4>Instances</h4>
          <ul className="list-group">
            {instances.map((instance) => (
              <li
                key={instance._id}
                className={`list-group-item ${
                  selectedInstance === instance._id ? "active" : ""
                }`}
                onClick={() => setSelectedInstance(instance._id)}
              >
                {instance.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedInstance && (
        <div>
          <h2>Database Management</h2>
          <div className="row">
            <div className="col-md-4">
              <h4>New Database</h4>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Database Name"
                value={newDatabaseName}
                onChange={(e) => setNewDatabaseName(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddDatabase}>
                Add Database
              </button>
            </div>
            <div className="col-md-8">
              <h4>Databases</h4>
              <ul className="list-group">
                {databases.map((database) => (
                  <li key={database._id} className="list-group-item">
                    {database.name}
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleRemoveDatabase(database._id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <UserList selectedInstance={selectedInstance} />
        </div>
      )}

      {/* User Management section can be similarly styled */}
    </div>
  );
};

export default DatabaseManagement;
