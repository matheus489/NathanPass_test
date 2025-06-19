const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config");
const { AppError } = require("../middlewares/error-handler");
const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  role: z.enum(["MERCHANT", "EMPLOYEE", "PARTNER"]),
  companyId: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const register = async (req, res, next) => {
  try {
    const { email, password, name, role, companyId } = registerSchema.parse(req.body);

    const [existingRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingRows.length > 0) {
      throw new AppError(400, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    await pool.query(
      "INSERT INTO users (id, email, password, name, role, company_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [userId, email, hashedPassword, name, role, companyId || null]
    );

    const token = jwt.sign(
      { userId: userId, role: role },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: userId,
          email,
          name,
          role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user || !user.password) {
      throw new AppError(401, "Invalid credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError(401, "Invalid credentials");
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "7d" }
    );
    res.json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Not authenticated");
    }
    const [rows] = await pool.query(
      `SELECT id, email, name, role, company_id FROM users WHERE id = ?`,
      [req.user.id]
    );
    const user = rows[0];
    if (!user) {
      throw new AppError(404, "User not found");
    }
    // Buscar dados da empresa, se houver
    let company = null;
    if (user.company_id) {
      const [companyRows] = await pool.query(
        `SELECT id, name FROM companies WHERE id = ?`,
        [user.company_id]
      );
      company = companyRows[0] || null;
    }
    res.json({
      status: "success",
      data: { user: { ...user, company } },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile }; 