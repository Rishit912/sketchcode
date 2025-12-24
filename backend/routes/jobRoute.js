const express = require("express");
const mongoose = require("mongoose");
const Job = require("../modles/job");
const { verifyToken, verifyAdmin } = require("../middleWare/authentication");

const router = express.Router();

// middleware to check DB connection
const checkDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service unavailable: database not connected' });
  }
  next();
};

// Public: fetch all jobs (ordered)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Service unavailable: database not connected' });
    }
    const jobs = await Job.find().sort({ order: 1, createdAt: 1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// Admin: add job
router.post('/add', checkDb, verifyToken, verifyAdmin, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(400).json({ message: err.message || 'Failed to create job' });
  }
});

// Admin: update job
router.put('/:id', checkDb, verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Job not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: 'Failed to update job' });
  }
});

// Admin: delete job
router.delete('/:id', checkDb, verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Job not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

// Admin: reorder jobs
router.patch('/reorder', checkDb, verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ message: 'orderedIds must be an array' });
    }
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index + 1 },
      },
    }));
    await Job.bulkWrite(bulkOps);
    const jobs = await Job.find().sort({ order: 1, createdAt: 1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error reordering jobs:', err);
    res.status(500).json({ message: 'Failed to reorder jobs' });
  }
});

module.exports = router;
