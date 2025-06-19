const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all wellness partners
router.get('/partners', async (req, res) => {
  try {
    const partners = await prisma.wellnessPartner.findMany({
      include: {
        services: true
      }
    });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get partner details
router.get('/partners/:partnerId', async (req, res) => {
  try {
    const partner = await prisma.wellnessPartner.findUnique({
      where: {
        id: req.params.partnerId
      },
      include: {
        services: true
      }
    });
    
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
    const services = await prisma.service.findMany({
      where: {
        partnerId: req.params.partnerId,
        isActive: true
      }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a booking
router.post('/bookings', async (req, res) => {
  try {
    const { userId, serviceId, date, time } = req.body;
    const booking = await prisma.booking.create({
      data: {
        userId,
        serviceId,
        date: new Date(date),
        time,
        status: 'PENDING'
      },
      include: {
        service: true,
        user: true
      }
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's wellness data
router.get('/wellness-data/:userId', async (req, res) => {
  try {
    const wellnessData = await prisma.wellnessData.findMany({
      where: {
        userId: req.params.userId
      },
      orderBy: {
        date: 'desc'
      }
    });
    res.json(wellnessData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add wellness data
router.post('/wellness-data', async (req, res) => {
  try {
    const { userId, serviceType, rating, notes } = req.body;
    const wellnessData = await prisma.wellnessData.create({
      data: {
        userId,
        serviceType,
        rating,
        notes,
        date: new Date()
      }
    });
    res.json(wellnessData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 