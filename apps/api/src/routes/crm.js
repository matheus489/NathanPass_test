const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all clients for a company
router.get('/clients/:companyId', async (req, res) => {
  try {
    const clients = await prisma.user.findMany({
      where: {
        companyId: req.params.companyId,
        role: 'EMPLOYEE'
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        bookings: {
          select: {
            id: true,
            date: true,
            status: true,
            service: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get client details
router.get('/clients/:companyId/:clientId', async (req, res) => {
  try {
    const client = await prisma.user.findUnique({
      where: {
        id: req.params.clientId,
        companyId: req.params.companyId
      },
      include: {
        bookings: {
          include: {
            service: true
          }
        }
      }
    });
    
    if (!client) {
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
    const client = await prisma.user.update({
      where: {
        id: req.params.clientId
      },
      data: {
        notes
      }
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 