const express = require('express');
const router = express.Router();
const { pool } = require('../config');

// Get all wellness partners
router.get('/partners', async (req, res) => {
  try {
    const partners = await pool.query(
      `SELECT * FROM wellness_partner WHERE is_active = 1`
    );
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get partner details
router.get('/partners/:partnerId', async (req, res) => {
  try {
    const partner = await pool.query(
      `SELECT * FROM wellness_partner WHERE id = ?`,
      [req.params.partnerId]
    );
    
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    
    res.json(partner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available services for a partner
router.get('/partners/:partnerId/services', async (req, res) => {
  try {
    const services = await pool.query(
      `SELECT * FROM service WHERE partner_id = ? AND is_active = 1`,
      [req.params.partnerId]
    );
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a booking
router.post('/bookings', async (req, res) => {
  try {
    const { userId, serviceId, date, time } = req.body;
    const booking = await pool.query(
      `INSERT INTO booking (user_id, service_id, date, time, status) VALUES (?, ?, ?, ?, ?)`,
      [userId, serviceId, date, time, 'PENDING']
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's wellness data
router.get('/wellness-data/:userId', async (req, res) => {
  try {
    const [wellnessData] = await pool.query(
      `SELECT * FROM wellness_data WHERE user_id = ? ORDER BY date DESC`,
      [req.params.userId]
    );
    res.json(wellnessData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add wellness data
router.post('/wellness-data', async (req, res) => {
  try {
    const { userId, serviceType, rating, notes } = req.body;
    const wellnessData = await pool.query(
      `INSERT INTO wellness_data (user_id, service_type, rating, notes, date) VALUES (?, ?, ?, ?, ?)`,
      [userId, serviceType, rating, notes, new Date()]
    );
    res.json(wellnessData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 