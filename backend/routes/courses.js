const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); 

// Route to get course details by ID
router.get('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        // Fetch course details by ID from the database
        const course = await Course.findById(courseId);
        
        // Check if the course exists
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        
        // If the course exists, return it
        return res.status(200).json({ success: true, data: course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
