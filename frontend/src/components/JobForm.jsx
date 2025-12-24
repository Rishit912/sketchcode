import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import api from "../api";

const emptyJob = {
  title: "",
  location: "Remote",
  type: "Full-time",
  mode: "Remote",
  description: "",
  requirements: "",
  responsibilities: "",
  applyEmail: "",
  applyLink: "",
  status: "open",
};

const JobForm = ({ onClose, onSaved, job }) => {
  const [form, setForm] = useState(emptyJob);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (job) {
      setForm({
        ...job,
        requirements: Array.isArray(job.requirements) ? job.requirements.join(", ") : "",
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join(", ") : "",
      });
    } else {
      setForm(emptyJob);
    }
  }, [job]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      requirements: form.requirements
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
      responsibilities: form.responsibilities
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
    };

    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    try {
      if (job && job._id) {
        await api.put(`/api/jobs/${job._id}`, payload, config);
      } else {
        await api.post(`/api/jobs/add`, payload, config);
      }
      onSaved();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-3xl rounded-xl shadow-2xl relative max-h-[90vh] overflow-auto border border-gray-700 text-gray-100">
        <div className="flex items-center justify-between mb-4 border-b border-gray-800 p-3 bg-gray-950/60 rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-100">{job ? "Edit Job" : "Add Job"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-gray-100 p-1.5 rounded-full"
          >
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 px-4 pb-6">
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Mode</label>
            <select
              value={form.mode}
              onChange={(e) => handleChange("mode", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>

          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-300 mb-1">Requirements (comma separated)</label>
            <textarea
              value={form.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-300 mb-1">Responsibilities (comma separated)</label>
            <textarea
              value={form.responsibilities}
              onChange={(e) => handleChange("responsibilities", e.target.value)}
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Apply Email</label>
            <input
              type="email"
              value={form.applyEmail}
              onChange={(e) => handleChange("applyEmail", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Apply Link (optional)</label>
            <input
              type="url"
              value={form.applyLink}
              onChange={(e) => handleChange("applyLink", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {error && (
            <div className="col-span-12 p-3 bg-red-500/10 text-red-200 rounded border border-red-500/30">
              {error}
            </div>
          )}

          <div className="col-span-12 flex justify-end gap-3 border-t border-gray-800 -mx-4 px-4 py-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
