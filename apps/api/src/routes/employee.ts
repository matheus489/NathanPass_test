import { Router } from "express"
import { authMiddleware } from "../middlewares/auth"
import {
  getAvailableServices,
  bookService,
  cancelBooking,
  getMyBookings,
  getWellnessData,
} from "../controllers/employee"

const employeeRouter = Router()

// Service discovery and booking
employeeRouter.get("/services", authMiddleware, getAvailableServices)
employeeRouter.post("/bookings", authMiddleware, bookService)
employeeRouter.delete("/bookings/:id", authMiddleware, cancelBooking)
employeeRouter.get("/bookings", authMiddleware, getMyBookings)

// Wellness data
employeeRouter.get("/wellness", authMiddleware, getWellnessData)

export default employeeRouter 