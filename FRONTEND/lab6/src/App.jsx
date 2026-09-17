import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.message);
        return;
      }
      setLoggedInUser(data.user);
    } catch (err) {
      setLoginError("Could not reach server");
    }
  };

  const fetchAllUsers = async () => {
    const res = await fetch(`${API_URL}/user`);
    const data = await res.json();
    setAllUsers(data.userData);
  };

  const fetchUserById = async () => {
    const res = await fetch(`${API_URL}/user/${searchId}`);
    const data = await res.json();
    setFoundUser(res.ok ? data.user : null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });
    setNewName("");
    setNewEmail("");
    fetchAllUsers();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/edit/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });
    fetchAllUsers();
  };

  if (!loggedInUser) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {loggedInUser.name}</h2>
      <button onClick={() => setLoggedInUser(null)}>Logout</button>

      <hr />
      <h3>All Users</h3>
      <button onClick={fetchAllUsers}>Load All Users</button>
      <ul>
        {allUsers.map((u) => (
          <li key={u.id}>
            {u.id} - {u.name} - {u.email}
          </li>
        ))}
      </ul>

      <hr />
      <h3>Find User by ID</h3>
      <input
        placeholder="Enter ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={fetchUserById}>Search</button>
      {foundUser && (
        <p>
          Found: {foundUser.name} - {foundUser.email}
        </p>
      )}

      <hr />
      <h3>Create User</h3>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      <hr />
      <h3>Edit User</h3>
      <form onSubmit={handleEdit}>
        <input
          placeholder="ID to edit"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
        />
        <input
          placeholder="New Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <input
          placeholder="New Email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default App;