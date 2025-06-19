const { pool } = require("../config");
const { AppError } = require("../middlewares/error-handler");
const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");

const serviceSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(), // in minutes
  price: z.number(),
  category: z.string(),
  maxParticipants: z.number(),
  location: z.string(),
  availability: z.array(
    z.object({
      dayOfWeek: z.number(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
});

const bookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});

const createService = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can create services");
    }

    const serviceData = serviceSchema.parse(req.body);

    const service = await prisma.service.create({
      data: {
        ...serviceData,
        partnerId: req.user.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can update services");
    }

    const { id } = req.params;
    const serviceData = serviceSchema.parse(req.body);

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new AppError(404, "Service not found");
    }

    if (service.partnerId !== req.user.id) {
      throw new AppError(403, "Not authorized to update this service");
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: serviceData,
    });

    res.json({
      status: "success",
      data: { service: updatedService },
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can delete services");
    }

    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new AppError(404, "Service not found");
    }

    if (service.partnerId !== req.user.id) {
      throw new AppError(403, "Not authorized to delete this service");
    }

    await prisma.service.delete({
      where: { id },
    });

    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const getServices = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can view their services");
    }

    const services = await prisma.service.findMany({
      where: { partnerId: req.user.id },
      include: {
        bookings: true,
      },
    });

    res.json({
      status: "success",
      data: { services },
    });
  } catch (error) {
    next(error);
  }
};

const getService = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can view their services");
    }

    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });

    if (!service) {
      throw new AppError(404, "Service not found");
    }

    if (service.partnerId !== req.user.id) {
      throw new AppError(403, "Not authorized to view this service");
    }

    res.json({
      status: "success",
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can view bookings");
    }

    const bookings = await prisma.booking.findMany({
      where: {
        service: {
          partnerId: req.user.id,
        },
      },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      status: "success",
      data: { bookings },
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    if (req.user?.role !== "PARTNER") {
      throw new AppError(403, "Only partners can update booking status");
    }

    const { id } = req.params;
    const { status } = bookingStatusSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new AppError(404, "Booking not found");
    }

    if (booking.service.partnerId !== req.user.id) {
      throw new AppError(403, "Not authorized to update this booking");
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    res.json({
      status: "success",
      data: { booking: updatedBooking },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res) => {/* TODO */};
const listBookings = async (req, res) => {/* TODO */};
const listPayments = async (req, res) => {/* TODO */};
const requestPayout = async (req, res) => {/* TODO */};
const partnerReport = async (req, res) => {
  try {
    const companyId = req.user?.company_id || req.query.companyId || 1;
    // Total de vendas (soma das receitas)
    const [sales] = await pool.query(
      "SELECT SUM(amount) as totalSales FROM financial_transactions WHERE company_id = ? AND type = 'income'",
      [companyId]
    );
    // Funcionários ativos
    const [employees] = await pool.query(
      "SELECT COUNT(*) as activeEmployees FROM users WHERE company_id = ? AND role = 'EMPLOYEE'",
      [companyId]
    );
    // Transações do dia
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const [transactionsToday] = await pool.query(
      "SELECT COUNT(*) as transactionsToday FROM financial_transactions WHERE company_id = ? AND DATE(date) = ?",
      [companyId, todayStr]
    );
    // Ticket médio
    const [ticket] = await pool.query(
      "SELECT AVG(amount) as avgTicket FROM financial_transactions WHERE company_id = ? AND type = 'income'",
      [companyId]
    );
    res.json({
      totalSales: sales[0].totalSales || 0,
      activeEmployees: employees[0].activeEmployees || 0,
      transactionsToday: transactionsToday[0].transactionsToday || 0,
      avgTicket: ticket[0].avgTicket || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const integratePDV = async (req, res) => {/* TODO */};
const createLiveClass = async (req, res) => {/* TODO */};
const listLiveClasses = async (req, res) => {/* TODO */};
const analyzeExercise = async (req, res) => {/* TODO */};
const syncWearable = async (req, res) => {/* TODO */};

module.exports = {
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
}; 