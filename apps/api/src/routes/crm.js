const express = require('express');
const router = express.Router();
const { pool } = require('../config');
const crmController = require('../controllers/crm');

// Get all clients for a company
router.get('/clients/:companyId', async (req, res) => {
  try {
    const [clients] = await pool.query(
      `SELECT id, name, email, created_at FROM users WHERE company_id = ? AND role = 'EMPLOYEE'`,
      [req.params.companyId]
    );
    // bookings e outros relacionamentos podem ser buscados em queries separadas se necessário
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get client details
router.get('/clients/:companyId/:clientId', async (req, res) => {
  try {
    const [client] = await pool.query(
      `SELECT id, name, email, created_at, bookings.id AS booking_id, bookings.date AS booking_date, bookings.status AS booking_status, bookings.service.name AS service_name, bookings.service.price AS service_price
       FROM users
       LEFT JOIN bookings ON users.id = bookings.user_id
       LEFT JOIN services ON bookings.service_id = services.id
       WHERE users.id = ? AND users.company_id = ?`,
      [req.params.clientId, req.params.companyId]
    );
    
    if (client.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add notes to client
router.post('/clients/:clientId/notes', async (req, res) => {
  try {
    const { notes } = req.body;
    const [updatedClient] = await pool.query(
      `UPDATE users SET notes = ? WHERE id = ?`,
      [notes, req.params.clientId]
    );
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clientes
router.post('/client', crmController.createClient);
router.get('/clients', crmController.listClients);
router.put('/client/:id', crmController.updateClient);
router.delete('/client/:id', crmController.deleteClient);

// Histórico de compras/interações
router.get('/client/:id/history', crmController.clientHistory);

// Promoções
router.post('/promotion', crmController.createPromotion);
router.get('/promotions', crmController.listPromotions);

// Automação de marketing
router.post('/marketing/send', crmController.sendMarketing);

// Fidelidade
router.post('/loyalty', crmController.createLoyalty);
router.get('/loyalty', crmController.listLoyalty);

// SEO local
router.get('/seo/tips', crmController.seoTips);

// Redes sociais
router.post('/social/schedule', crmController.schedulePost);
router.get('/social/scheduled', crmController.listScheduledPosts);

// Indicação
router.post('/referral', crmController.createReferral);
router.get('/referrals', crmController.listReferrals);

module.exports = router; 