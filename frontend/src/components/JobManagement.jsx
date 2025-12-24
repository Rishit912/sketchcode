import React, { useEffect, useState } from "react";
import api from "../api";
import JobForm from "./JobForm";

const JobManagement = ({ embedded = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const fetchJobs = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get('/api/jobs', authConfig);
      setJobs(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job posting?')) return;
    try {
      await api.delete(`/api/jobs/${id}`, authConfig);
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete job');
    }
  };

  const moveJob = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= jobs.length) return;
    const list = [...jobs];
    [list[index], list[target]] = [list[target], list[index]];
    setJobs(list);
    try {
      const orderedIds = list.map(j => j._id || j.id);
      await api.patch('/api/jobs/reorder', { orderedIds }, authConfig);
    } catch (err) {
      console.error('Failed to reorder jobs', err);
      fetchJobs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Job Postings</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Add Job
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-300">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 text-gray-300">
          No jobs posted yet. Click "Add Job" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job, idx) => (
            <div key={job._id || job.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-gray-400 text-sm">{job.location} • {job.type} • {job.mode}</p>
                  <p className="text-gray-300 mt-3 text-sm">{job.description}</p>
                  {job.requirements?.length > 0 && (
                    <div className="mt-3 text-sm text-gray-300">
                      <span className="font-semibold">Requirements:</span> {job.requirements.join(', ')}
                    </div>
                  )}
                  {job.responsibilities?.length > 0 && (
                    <div className="mt-1 text-sm text-gray-300">
                      <span className="font-semibold">Responsibilities:</span> {job.responsibilities.join(', ')}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-gray-400">Status: {job.status}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => moveJob(idx, -1)} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600" title="Move up">↑</button>
                  <button onClick={() => moveJob(idx, 1)} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600" title="Move down">↓</button>
                  <button onClick={() => { setEditing(job); setShowForm(true); }} className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">Edit</button>
                  <button onClick={() => handleDelete(job._id || job.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <JobForm
          job={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); fetchJobs(); }}
        />
      )}
    </div>
  );
};

export default JobManagement;
