const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
  createService,
  updateService,
  deleteService,
  getServices,
  getService,
  getBookings,
  updateBookingStatus,
  updateProfile,
  listBookings,
  listPayments,
  requestPayout,
  partnerReport,
  integratePDV,
  createLiveClass,
  listLiveClasses,
  analyzeExercise,
  syncWearable,
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

// Gestão de perfil
router.put("/profile", authMiddleware, updateProfile);

// Agendamentos
router.get("/bookings", authMiddleware, listBookings);
router.put("/booking/:id/status", authMiddleware, updateBookingStatus);

// Pagamentos
router.get("/payments", authMiddleware, listPayments);
router.post("/payout", authMiddleware, requestPayout);

// Relatórios
router.get("/report", authMiddleware, partnerReport);

// Integração com PDV
router.post("/pdv/integrate", authMiddleware, integratePDV);

// Aulas online
router.post("/live-class", authMiddleware, createLiveClass);
router.get("/live-classes", authMiddleware, listLiveClasses);

// Análise de execução
router.post("/analyze-exercise", authMiddleware, analyzeExercise);

// Integração wearable
router.post("/wearable/sync", authMiddleware, syncWearable);

module.exports = router; 