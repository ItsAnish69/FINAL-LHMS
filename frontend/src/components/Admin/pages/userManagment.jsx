import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserManagement = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role:"" });

  useEffect(() => {
    fetch(`https://lhms-website.onrender.com/api/user/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // --------- DELETE ---------
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedUser) return;

    fetch(`https://lhms-website.onrender.com/api/user/${selectedUser._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setUsers(users.filter((u) => u._id !== selectedUser._id));
        alert("User deleted successfully");
        setShowDeleteModal(false);
        setSelectedUser(null);
      });
  };

  // --------- EDIT ---------
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (!selectedUser) return;

    fetch(`https://lhms-website.onrender.com/api/user/${selectedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), 
    })
      .then((res) => res.json())
      .then((updated) => {
        setUsers(
          users.map((u) => (u._id === selectedUser._id ? { ...u, ...updated } : u))
        );
        alert("User updated successfully");
        setShowEditModal(false);
        setSelectedUser(null);
      });
  };

  // --------- ADD ---------
  const handleAddUser = () => {
    setFormData({ name: "", email: "", password: "", role:"" });
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`https://lhms-website.onrender.com/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        alert("User added successfully");
        //code to refresh the window
        window.location.reload();
        setShowAddModal(false);
      });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-8 py-2 rounded-md mr-2"
          >
            Add User
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="p-3 flex justify-center items-center px-6 gap-x-5">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
          Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-2 text-left w-1/12">ID</th>
              <th className="border-b p-2 text-left w-4/12">Name</th>
              <th className="border-b p-2 text-left w-4/12">Email</th>
              <th className="border-b p-2 text-left w-4/12">Role</th>
              <th className="border-b p-2 text-left w-3/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-xl">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <tr key={user._id}>
                  <td className="border-b p-2">{idx + 1}</td>
                  <td className="border-b p-2">{user.name}</td>
                  <td className="border-b p-2">{user.email}</td>
                  <td className="border-b p-2">{user.role}</td>
                  <td className="border-b p-2">
                    <div className="flex space-x-5">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
            <h3 className="text-lg font-bold text-center mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
{showEditModal && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
      <h3 className="text-lg font-bold text-center mb-4">Edit User</h3>

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={confirmEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          Update
        </button>
        <button
          onClick={() => setShowEditModal(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-md w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* ADD USER MODAL */}
{showAddModal && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
      <h3 className="text-lg font-bold text-center mb-4">Add User</h3>

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

       <input
        type="password"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <select
        type="role"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Role"
        value={formData.role}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value })
        }
      >
        <option value="">Select Role</option>
        <option value="librarian">Librarian</option>
        <option value="borrower">Borrower</option>
      </select>

      <div className="flex gap-3 mt-4">
        <button
          onClick={confirmAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          Add
        </button>
        <button
          onClick={() => setShowAddModal(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-md w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default UserManagement;
