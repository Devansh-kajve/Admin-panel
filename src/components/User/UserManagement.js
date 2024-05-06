import React, { useState, useEffect } from "react";
import API from "../../services/api";

const UserManagement = ({ selectedInstance }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (selectedInstance) {
          const response = await API.get(
            `/instances/${selectedInstance}/users`
          );
          setUsers(response.data);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchUsers();
  }, [selectedInstance]);

  const handleAddUser = async () => {
    try {
      const response = await API.post(
        `/instances/${selectedInstance}/users`,
        newUser
      );
      console.log(response.data);
      setNewUser({ username: "", password: "", role: "" });
      setUsers([...users, response.data]);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const response = await API.delete(
        `/instances/${selectedInstance}/users/${userId}`
      );
      console.log(response.data);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleChangePassword = async (userId, newPassword) => {
    try {
      const response = await API.patch(
        `/instances/${selectedInstance}/users/${userId}/change-password`,
        { newPassword }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <h4>Add User</h4>
      <input
        type="text"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        placeholder="Username"
      />
      <input
        type="password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        placeholder="Password"
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="reader">Reader</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <h4>Users</h4>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - Role: {user.role}
            <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
            <button
              onClick={() => handleChangePassword(user._id, "newPassword")}
            >
              Change Password
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
