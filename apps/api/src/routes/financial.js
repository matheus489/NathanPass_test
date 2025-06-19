const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financial');

// Get all financial transactions for a company
router.get('/transactions/:companyId', financialController.listTransactions);

// Create a new financial transaction
router.post('/transactions', financialController.createTransaction);

// Get financial summary for a company
router.get('/summary/:companyId', financialController.financialSummary);

// Contas a pagar/receber
router.post('/account', financialController.createAccount);
router.get('/accounts', financialController.listAccounts);
router.post('/account/pay', financialController.payAccount);

// Conciliação bancária
router.post('/bank/import', financialController.importBankStatement);
router.post('/bank/reconcile', financialController.reconcileBank);

// Reservas financeiras
router.post('/reserve', financialController.createReserve);
router.get('/reserves', financialController.listReserves);

// Precificação
router.post('/pricing/calculate', financialController.calculatePricing);

// Estoque
router.post('/inventory', financialController.addInventoryMovement);
router.get('/inventory', financialController.listInventory);

// Relatórios financeiros
router.get('/report', financialController.financialReport);

// Integração contábil
router.get('/accounting/export', financialController.exportAccounting);

// Emissão de nota fiscal/boletos
router.post('/invoice', financialController.issueInvoice);
router.post('/boleto', financialController.issueBoleto);

// Previsão de fluxo de caixa
router.get('/cashflow/forecast', financialController.cashflowForecast);

module.exports = router; 