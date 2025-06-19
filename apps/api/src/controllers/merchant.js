const { pool } = require("../config");
const { AppError } = require("../middlewares/error-handler");
const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");

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
    const companyId = uuidv4();
    await pool.query(
      `INSERT INTO companies (id, name, industry, size, address, contact_email, contact_phone, merchant_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [companyId, companyData.name, companyData.industry, companyData.size, companyData.address, companyData.contactEmail, companyData.contactPhone, req.user.id]
    );
    res.status(201).json({ status: "success", data: { company: { id: companyId, ...companyData, merchantId: req.user.id } } });
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
    const [companies] = await pool.query(`SELECT * FROM companies WHERE id = ?`, [id]);
    const company = companies[0];
    if (!company) throw new AppError(404, "Company not found");
    if (company.merchant_id !== req.user.id) throw new AppError(403, "Not authorized to update this company");
    await pool.query(
      `UPDATE companies SET name=?, industry=?, size=?, address=?, contact_email=?, contact_phone=?, updated_at=NOW() WHERE id=?`,
      [companyData.name, companyData.industry, companyData.size, companyData.address, companyData.contactEmail, companyData.contactPhone, id]
    );
    res.json({ status: "success", data: { company: { ...company, ...companyData } } });
  } catch (error) {
    next(error);
  }
};

const getCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [companies] = await pool.query(`SELECT * FROM companies WHERE id = ?`, [id]);
    const company = companies[0];
    if (!company) throw new AppError(404, "Company not found");
    if (req.user?.role !== "MERCHANT" || company.merchant_id !== req.user.id) throw new AppError(403, "Not authorized to view this company");
    // Buscar funcionários e assinaturas
    const [employees] = await pool.query(`SELECT * FROM users WHERE company_id = ? AND role = 'EMPLOYEE'`, [id]);
    // Supondo que subscriptions não está implementado, pode ser adicionado depois
    res.json({ status: "success", data: { company: { ...company, employees } } });
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    if (req.user?.role !== "MERCHANT") {
      throw new AppError(403, "Only merchants can view employees");
    }
    const [companies] = await pool.query(`SELECT * FROM companies WHERE merchant_id = ?`, [req.user.id]);
    const company = companies[0];
    if (!company) throw new AppError(404, "Company not found");
    const [employees] = await pool.query(`SELECT * FROM users WHERE company_id = ? AND role = 'EMPLOYEE'`, [company.id]);
    res.json({ status: "success", data: { employees } });
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
    const [companies] = await pool.query(`SELECT * FROM companies WHERE merchant_id = ?`, [req.user.id]);
    const company = companies[0];
    if (!company) throw new AppError(404, "Company not found");
    const [existingUsers] = await pool.query(`SELECT * FROM users WHERE email = ?`, [employeeData.email]);
    if (existingUsers.length > 0) throw new AppError(400, "Email already registered");
    const employeeId = uuidv4();
    await pool.query(
      `INSERT INTO users (id, email, name, role, company_id, position, department, created_at, updated_at) VALUES (?, ?, ?, 'EMPLOYEE', ?, ?, ?, NOW(), NOW())`,
      [employeeId, employeeData.email, employeeData.name, company.id, employeeData.position, employeeData.department]
    );
    res.status(201).json({ status: "success", data: { employee: { id: employeeId, ...employeeData, companyId: company.id } } });
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
    const [companies] = await pool.query(`SELECT * FROM companies WHERE merchant_id = ?`, [req.user.id]);
    const company = companies[0];
    if (!company) throw new AppError(404, "Company not found");
    const [employees] = await pool.query(`SELECT * FROM users WHERE id = ? AND company_id = ? AND role = 'EMPLOYEE'`, [id, company.id]);
    if (employees.length === 0) throw new AppError(404, "Employee not found");
    await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
    res.json({ status: "success", message: "Employee removed" });
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
    const [companies] = await pool.query(`SELECT * FROM companies WHERE merchant_id = ?`, [req.user.id]);
    const company = companies[0];
    if (!company) throw new AppError(404, "Company not found");
    const [employees] = await pool.query(`SELECT * FROM users WHERE id = ? AND company_id = ? AND role = 'EMPLOYEE'`, [id, company.id]);
    if (employees.length === 0) throw new AppError(404, "Employee not found");
    await pool.query(
      `UPDATE users SET name = ?, position = ?, department = ?, updated_at = NOW() WHERE id = ?`,
      [employeeData.name, employeeData.position, employeeData.department, id]
    );
    res.json({ status: "success", message: "Employee updated" });
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