"use client";

import { useEffect, useState } from "react";
import Management_table from "@/app/components/Management_table";
import { getUsers } from "@/services/userService";
import { useToast } from "@/hooks/useToast";
import { format_phone, format_date } from "@/utils/helpers";

const page = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { error: toastError, success: toastSuccess } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "car_owner",
  });
  const [submitting, setSubmitting] = useState(false);

  const getAllUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getUsers(page, limit);

      const formattedUsers =
        res?.data?.map((user) => ({
          name: user.name ?? "(Empty)",
          phone: format_phone(user.phoneNumber),
          email: user.email ?? "(Empty)",
          date: format_date(user.createdAt),
          status: user.isActive === 1 ? "Active" : "Inactive",
        })) || [];

      setData(formattedUsers);
      setTotal(res?.total || 0);
      setTotalPages(res?.totalPages || 1);
      setCurrentPage(res?.page || 1);
    } catch (error) {
      toastError(error?.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      getAllUsers(newPage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // API call would go here
      console.log("Creating user:", formData);
      toastSuccess("User created successfully!");
      setIsModalOpen(false);
      setFormData({ name: "", email: "", password: "", role: "car_owner" });
    } catch (error) {
      toastError(error?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", password: "", role: "car_owner" });
  };

  useEffect(() => {
    getAllUsers(currentPage);
  }, []);

  const headings = [
    "Name",
    "Mobile Number",
    "Email Address",
    "Date",
    "Status",
    "Action",
  ];

  return (
    <>
      <section className="main-content-area">
        <div className="create-user-header">
          <h1 className="dashboard-hd">User Management</h1>
          <button className="gradient-button create-user-btn" onClick={openModal}>
            <i className="fa-solid fa-plus"></i>
            Create User
          </button>
        </div>

        <Management_table
          heading={headings}
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </section>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create User</h2>
              <button className="modal-close" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="car_owner">Car Owner</option>
                  <option value="admin">Admin</option>
                  <option value="driver">Driver</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}!
    </>
  );
};

export default page;
