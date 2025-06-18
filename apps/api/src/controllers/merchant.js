const { prisma } = require("@nathanpass/database");
const { AppError } = require("../middlewares/error-handler");
const { z } = require("zod");

const companySchema = z.object({
  name: z.string(),
  industry: z.string(),
  size: z.number(),
  address: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
});

const employeeSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  position: z.string(),
  department: z.string(),
});

const createCompany = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can create companies");
    }

    const companyData = companySchema.parse(req.body);

    const company = await prisma.company.create({
      data: {
        ...companyData,
        merchantId: req.user.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: { company },
    });
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can update companies");
    }

    const { id } = req.params;
    const companyData = companySchema.parse(req.body);

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    if (company.merchantId !== req.user.id) {
      throw new AppError(403, "Not authorized to update this company");
    }

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: companyData,
    });

    res.json({
      status: "success",
      data: { company: updatedCompany },
    });
  } catch (error) {
    next(error);
  }
};

const getCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        employees: true,
        subscriptions: true,
      },
    });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    if (
      req.user?.role !== "MERCHANT" ||
      (req.user.role === "MERCHANT" && company.merchantId !== req.user.id)
    ) {
      throw new AppError(403, "Not authorized to view this company");
    }

    res.json({
      status: "success",
      data: { company },
    });
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can view employees");
    }

    const company = await prisma.company.findFirst({
      where: { merchantId: req.user.id },
    });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    const employees = await prisma.user.findMany({
      where: {
        companyId: company.id,
        role: "EMPLOYEE",
      },
    });

    res.json({
      status: "success",
      data: { employees },
    });
  } catch (error) {
    next(error);
  }
};

const addEmployee = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can add employees");
    }

    const employeeData = employeeSchema.parse(req.body);

    const company = await prisma.company.findFirst({
      where: { merchantId: req.user.id },
    });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: employeeData.email },
    });

    if (existingUser) {
      throw new AppError(400, "Email already registered");
    }

    const employee = await prisma.user.create({
      data: {
        ...employeeData,
        role: "EMPLOYEE",
        companyId: company.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: { employee },
    });
  } catch (error) {
    next(error);
  }
};

const removeEmployee = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can remove employees");
    }

    const { id } = req.params;

    const company = await prisma.company.findFirst({
      where: { merchantId: req.user.id },
    });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    const employee = await prisma.user.findUnique({
      where: { id },
    });

    if (!employee || employee.companyId !== company.id) {
      throw new AppError(404, "Employee not found");
    }

    await prisma.user.delete({
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

const updateEmployee = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can update employees");
    }

    const { id } = req.params;
    const employeeData = employeeSchema.parse(req.body);

    const company = await prisma.company.findFirst({
      where: { merchantId: req.user.id },
    });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    const employee = await prisma.user.findUnique({
      where: { id },
    });

    if (!employee || employee.companyId !== company.id) {
      throw new AppError(404, "Employee not found");
    }

    const updatedEmployee = await prisma.user.update({
      where: { id },
      data: employeeData,
    });

    res.json({
      status: "success",
      data: { employee: updatedEmployee },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompany,
  updateCompany,
  getCompany,
  getEmployees,
  addEmployee,
  removeEmployee,
  updateEmployee,
}; 