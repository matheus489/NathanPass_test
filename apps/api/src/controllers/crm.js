const { pool } = require('../config');

// Cadastro de cliente
exports.createClient = async (req, res) => {
  try {
    const { name, email, phone, notes } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }
    const [result] = await pool.query(
      "INSERT INTO users (name, email, phone, notes, role) VALUES (?, ?, ?, ?, 'EMPLOYEE')",
      [name, email, phone, notes || ""]
    );
    const [client] = await pool.query("SELECT id, name, email, phone, notes FROM users WHERE id = ?", [result.insertId]);
    res.status(201).json(client[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listClients = async (req, res) => {
  try {
    const [clients] = await pool.query(
      "SELECT id, name, email, phone, notes FROM users WHERE role = 'EMPLOYEE'"
    );
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, notes } = req.body;
    await pool.query(
      "UPDATE users SET name = ?, email = ?, phone = ?, notes = ? WHERE id = ? AND role = 'EMPLOYEE'",
      [name, email, phone, notes || "", id]
    );
    const [client] = await pool.query("SELECT id, name, email, phone, notes FROM users WHERE id = ?", [id]);
    res.json(client[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'EMPLOYEE'", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Histórico de compras/interações
exports.clientHistory = async (req, res) => {/* TODO */};

// Promoções
exports.createPromotion = async (req, res) => {/* TODO */};
exports.listPromotions = async (req, res) => {/* TODO */};

// Automação de marketing
exports.sendMarketing = async (req, res) => {/* TODO */};

// Fidelidade
exports.createLoyalty = async (req, res) => {/* TODO */};
exports.listLoyalty = async (req, res) => {/* TODO */};

// SEO local
exports.seoTips = async (req, res) => {/* TODO */};

// Gestão de redes sociais
exports.schedulePost = async (req, res) => {/* TODO */};
exports.listScheduledPosts = async (req, res) => {/* TODO */};

// Programa de indicação
exports.createReferral = async (req, res) => {/* TODO */};
exports.listReferrals = async (req, res) => {/* TODO */}; 