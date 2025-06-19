const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all financial transactions for a company
router.get('/transactions/:companyId', async (req, res) => {
  try {
    const transactions = await prisma.financialTransaction.findMany({
      where: {
        companyId: req.params.companyId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new financial transaction
router.post('/transactions', async (req, res) => {
  try {
    const { amount, type, description, companyId } = req.body;
    const transaction = await prisma.financialTransaction.create({
      data: {
        amount,
        type,
        description,
        companyId
      }
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get financial summary for a company
router.get('/summary/:companyId', async (req, res) => {
  try {
    const transactions = await prisma.financialTransaction.findMany({
      where: {
        companyId: req.params.companyId
      }
    });

    const summary = {
      totalIncome: transactions
        .filter(t => t.type === 'SERVICE')
        .reduce((sum, t) => sum + t.amount, 0),
      totalExpenses: transactions
        .filter(t => t.type === 'SUBSCRIPTION')
        .reduce((sum, t) => sum + t.amount, 0),
      balance: transactions.reduce((sum, t) => {
        return sum + (t.type === 'SERVICE' ? t.amount : -t.amount);
      }, 0)
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 