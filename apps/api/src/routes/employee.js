const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const employeeController = require("../controllers/employee");

const employeeRouter = Router();

// Service discovery and booking
employeeRouter.get("/services", authMiddleware, employeeController.getAvailableServices);
employeeRouter.post("/bookings", authMiddleware, employeeController.bookService);
employeeRouter.delete("/bookings/:id", authMiddleware, employeeController.cancelBooking);
employeeRouter.get("/bookings", authMiddleware, employeeController.getMyBookings);

// Wellness data
employeeRouter.get("/wellness", authMiddleware, employeeController.getWellnessData);

// Faltas e afastamentos
employeeRouter.post('/absence', employeeController.createAbsence);
employeeRouter.get('/absences', employeeController.listAbsences);

// Benefícios de bem-estar
employeeRouter.post('/benefits', employeeController.manageBenefits);
employeeRouter.get('/wellness/metrics', employeeController.getWellnessMetrics);

// Comunicação interna
employeeRouter.post('/internal-message', employeeController.postInternalMessage);
employeeRouter.get('/internal-messages', employeeController.listInternalMessages);

// Controle de ponto
employeeRouter.post('/clockin', employeeController.registerClockIn);
employeeRouter.get('/clockins', employeeController.listClockIns);

// Permissões
employeeRouter.put('/permissions/:id', employeeController.updatePermissions);

module.exports = employeeRouter; 