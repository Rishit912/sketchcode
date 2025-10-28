const express = require("express");
const TeamMember = require('../modles/teamMember');
// NEW: Import both functions from the updated authentication.js
const { verifyToken, verifyAdmin } = require("../middleWare/authentication"); 

const router = express.Router();

// Add Team Member - NOW PROTECTED BY ADMIN ROLE
router.post("/add", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { name, position, bio, imageUrl, socialLinks, skills } = req.body;

        const newTeamMember = new TeamMember({
            name,
            position,
            bio,
            imageUrl,
            socialLinks,
            skills
        });

        const teamMember = await newTeamMember.save();
        res.json(teamMember); // Removed unnecessary curly brace wrap
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch all team members - REMAINS PUBLIC (No middleware)
router.get("/", async (req, res) => {
    try {
        // Return ordered list: first by explicit order (asc), then by createdAt
        const teamMembers = await TeamMember.find().sort({ order: 1, createdAt: 1 });
        res.json(teamMembers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reorder team members - NOW PROTECTED BY ADMIN ROLE
router.patch('/reorder', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { orderedIds } = req.body;
        if (!Array.isArray(orderedIds)) return res.status(400).json({ message: 'orderedIds must be an array' });

        // Update each doc with its index
        const bulkOps = orderedIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index + 1 } }
            }
        }));

        if (bulkOps.length > 0) {
            await TeamMember.bulkWrite(bulkOps);
        }

        const teamMembers = await TeamMember.find().sort({ order: 1, createdAt: 1 });
        res.json(teamMembers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit team member - NOW PROTECTED BY ADMIN ROLE
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const updated = await TeamMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Team member not found" });
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete team member - NOW PROTECTED BY ADMIN ROLE
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const deleted = await TeamMember.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Team member not found" });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;