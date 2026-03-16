"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Management_table from "@/app/components/Management_table";
import { getUsers, createUser, deleteUser } from "@/services/userService";
import { useToast } from "@/hooks/useToast";
import { format_phone, format_date } from "@/utils/helpers";
import { ROLE } from "@/constants/role";
import Loading from "@/app/components/Loading";

// Role options with labels for display
const ROLE_OPTIONS = [
  { value: "", label: "All Roles" },
  { value: ROLE.ADMIN, label: "Admin" },
  { value: ROLE.USER, label: "User" },
  { value: ROLE.CAR_OWNER, label: "Car Owner" },
  { value: ROLE.ACCOMMODATION_OWNER, label: "Accommodation Owner" },
  { value: ROLE.RESTAURANT_OWNER, label: "Restaurant Owner" },
];

const page = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const { error: toastError, success: toastSuccess } = useToast();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const getAllUsers = async (page = 1, role = "") => {
    try {
      setLoading(true);
      const res = await getUsers(page, limit, role);

      const formattedUsers = res?.data?.map((user) => ({
          id: user.id,
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
      getAllUsers(newPage, selectedRole);
    }
  };

  const handleRoleFilterChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    getAllUsers(1, role);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createUser(formData);
      
      if (res.success) {
        toastSuccess(res.message);
        setIsModalOpen(false);
        await getAllUsers(currentPage, selectedRole);
        setFormData({ name: "", email: "", password: "", phoneNumber: "", role: "" });
      }
      
    } catch (error) {
      toastError(error?.message || "Failed to create user");

    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);
      const res = await deleteUser(userId);
      
      if (res?.success) {
        toastSuccess(res.message || "User deleted successfully");

        setTimeout(() => {
          getAllUsers(currentPage, selectedRole);
        }, 3000);
        
      }
      
    } catch (error) {
      toastError(error?.message || "Failed to delete user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", password: "", phoneNumber: "", role: "" });
  };

  useEffect(() => {
    getAllUsers(currentPage, selectedRole);
  }, []);

  const headings = [
    "Name",
    "Email Address",
    "Phone Number",
    "Date",
    "Status",
    "Action",
  ];

  return (
    <>
      <section className="main-content-area" style={{ background: "#fffaf9" }}>
        <Loading loading={loading} text="Loading users..." />

        {!loading && (
          <>
            <div className="create-user-header">
              <h1 className="dashboard-hd">User Management</h1>

              <div className="role-filter-wrapper">
                <div className="role-filter-dropdown">
                  <select className="role-filter-select" value={selectedRole} onChange={handleRoleFilterChange}>
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="gradient-button create-user-btn" onClick={openModal}>
                  <i className="fa-solid fa-plus"></i>
                  Create User
                </button>
              </div>
            </div>

            <Management_table
              heading={headings}
              data={data}
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              limit={limit}
              onPageChange={handlePageChange}
              onDelete={handleDeleteUser}
            />
          </>
        )}
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
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
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
                  <option value="" disabled>Select Role</option>
                  {ROLE_OPTIONS
                    .filter((option) => !["", ROLE.ADMIN].includes(option.value))
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  }
                </select>
              </div>

              <button
                type="submit"
                className="w-100 submit-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
