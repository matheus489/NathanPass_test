const { Router } = require("express");
const { register, login, getProfile } = require("../controllers/auth");
const { authMiddleware } = require("../middlewares/auth");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router; 