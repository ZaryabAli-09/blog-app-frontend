import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Spinner } from "flowbite-react";
import ConfirmationDialog from "./ConfirmationDialog";

const DashCategories = () => {
  const currentUser = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const confirmationDialogRef = useRef(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/get-categories`,
      );
      const data = await res.json();
      if (res.ok) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      return setErrorMessage("Category name is required");
    }
    try {
      setCreating(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newCategoryName.trim() }),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Category created successfully");
        setNewCategoryName("");
        fetchCategories();
        setTimeout(() => setSuccessMessage(null), 2000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setCreating(false);
    }
  };

  const deleteCategoryHandler = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/delete/${deleteId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCategories((prev) => prev.filter((_, i) => i !== deleteId));
        setOnDelete(false);
        setDeleteId("");
      }
    } catch (error) {
      // silent
    }
  };

  return (
    <div className="p-3 md:mx-auto w-full">
      <div className="lg:mx-20 mt-1 mb-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Categories</h2>

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleCreateCategory} className="flex gap-3 mb-8">
            <input
              type="text"
              placeholder="New category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={creating}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {creating ? <Spinner size="sm" /> : "Add Category"}
            </button>
          </form>

          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <table className="min-w-full table-auto whitespace-nowrap">
              <thead className="text-left font-semibold text-gray-500 text-sm uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Category Name</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center p-8">
                      <Spinner className="w-8 h-8 text-purple-600 mx-auto" />
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map((cat, i) => (
                    <tr key={i} className="text-sm border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 capitalize">{cat}</td>
                      <td className="px-4 py-3">
                        <span
                          onClick={() => {
                            setDeleteId(i);
                            setOnDelete(true);
                          }}
                          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                        >
                          <MdDelete className="text-lg" />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-8 text-gray-500">
                      <p className="text-lg font-medium">No categories yet</p>
                      <p className="text-sm text-gray-400">Create your first category above</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div ref={confirmationDialogRef} className="w-96 mx-auto mb-10">
        {onDelete && (
          <ConfirmationDialog
            message={"Are you sure you want to delete this category?"}
            onCancel={() => {
              setOnDelete(false);
              setDeleteId("");
            }}
            onConfirm={() => {
              deleteCategoryHandler();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashCategories;