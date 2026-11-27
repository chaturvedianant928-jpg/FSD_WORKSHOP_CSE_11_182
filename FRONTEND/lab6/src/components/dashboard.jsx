import { useState } from "react";

function Dashboard({ onLogout }) {

  // Multiple users
  const [users, setUsers] = useState([
    {
      id: "CSE23101",
      name: "Anshika Singh",
      email: "anshika@gmail.com",
    },
    {
      id: "CSE23102",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
    },
    {
      id: "CSE23103",
      name: "Priya Singh",
      email: "priya@gmail.com",
    },
    {
      id: "CSE23104",
      name: "Aman Kumar",
      email: "aman@gmail.com",
    },
    {
      id: "CSE23105",
      name: "Sneha Verma",
      email: "sneha@gmail.com",
    },
  ]);

  const [editingId, setEditingId] = useState(null);

  // Edit user
  const handleEdit = (id) => {
    setEditingId(id);
  };

  // Save edited user
  const handleSave = () => {
    setEditingId(null);
  };

  // Delete user
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {

      setUsers(
        users.filter((user) => user.id !== id)
      );

    }
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">

        <h2>Dashboard</h2>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>


      {/* Users section */}
      <div className="users-container">

        <h2>User Details</h2>

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>

          </thead>


          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                {/* Name */}
                <td>

                  {editingId === user.id ? (

                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => {

                        setUsers(
                          users.map((u) =>
                            u.id === user.id
                              ? {
                                  ...u,
                                  name: e.target.value,
                                }
                              : u
                          )
                        );

                      }}
                    />

                  ) : (

                    user.name

                  )}

                </td>


                {/* ID */}
                <td>

                  {editingId === user.id ? (

                    <input
                      type="text"
                      value={user.id}
                      onChange={(e) => {

                        setUsers(
                          users.map((u) =>
                            u.id === user.id
                              ? {
                                  ...u,
                                  id: e.target.value,
                                }
                              : u
                          )
                        );

                      }}
                    />

                  ) : (

                    user.id

                  )}

                </td>


                {/* Email */}
                <td>

                  {editingId === user.id ? (

                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => {

                        setUsers(
                          users.map((u) =>
                            u.id === user.id
                              ? {
                                  ...u,
                                  email: e.target.value,
                                }
                              : u
                          )
                        );

                      }}
                    />

                  ) : (

                    user.email

                  )}

                </td>


                {/* Actions */}
                <td>

                  {editingId === user.id ? (

                    <button
                      className="save-btn"
                      onClick={handleSave}
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(user.id)
                      }
                    >
                      Edit
                    </button>

                  )}


                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(user.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;