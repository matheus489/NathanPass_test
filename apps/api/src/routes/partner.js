const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const {
  createService,
  updateService,
  deleteService,
  getServices,
  getService,
  getBookings,
  updateBookingStatus,
} = require("../controllers/partner");

// Service routes
router.post("/services", authMiddleware, createService);
router.put("/services/:id", authMiddleware, updateService);
router.delete("/services/:id", authMiddleware, deleteService);
router.get("/services", authMiddleware, getServices);
router.get("/services/:id", authMiddleware, getService);

// Booking routes
router.get("/bookings", authMiddleware, getBookings);
router.put("/bookings/:id/status", authMiddleware, updateBookingStatus);

module.exports = router; 