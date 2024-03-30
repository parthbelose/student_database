import express from "express";
const router = express.Router();
import { review } from "../models/review.js";

router.post("/reviews", async (req, res) => {
  console.log('hello');
    const { reviews } = req.body;
    const r = new review ({  reviews  });
    try {
      await r.save();
      res.status(201).json({
        success: true, 
        message: 'Review created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving review to the database' });
    }
  });
  
  export { router as reviewRouter };