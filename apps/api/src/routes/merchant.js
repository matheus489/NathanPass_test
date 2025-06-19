const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  createCompany,
  updateCompany,
  getCompany,
  getEmployees,
  addEmployee,
  removeEmployee,
  updateEmployee,
} = require("../controllers/merchant");

const merchantRouter = Router();

// Company routes
merchantRouter.post("/company", authMiddleware, createCompany);
merchantRouter.put("/company/:id", authMiddleware, updateCompany);
merchantRouter.get("/company/:id", authMiddleware, getCompany);

// Employee routes
merchantRouter.get("/employees", authMiddleware, getEmployees);
merchantRouter.post("/employees", authMiddleware, addEmployee);
merchantRouter.delete("/employees/:id", authMiddleware, removeEmployee);
merchantRouter.put("/employees/:id", authMiddleware, updateEmployee);

module.exports = merchantRouter; 