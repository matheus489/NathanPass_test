const { pool } = require('../config');

// Listar transações financeiras de uma empresa
const listTransactions = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM financial_transactions WHERE company_id = ? ORDER BY date DESC',
      [req.params.companyId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar nova transação financeira
const createTransaction = async (req, res) => {
  try {
    const { amount, type, description, category, date, companyId } = req.body;
    if (!amount || !type || !category || !date || !companyId) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }
    const [result] = await pool.query(
      'INSERT INTO financial_transactions (amount, type, description, category, date, company_id) VALUES (?, ?, ?, ?, ?, ?)',
      [amount, type, description, category, date, companyId]
    );
    const [transaction] = await pool.query('SELECT * FROM financial_transactions WHERE id = ?', [result.insertId]);
    res.status(201).json(transaction[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resumo financeiro de uma empresa
const financialSummary = async (req, res) => {
  try {
    const [transactions] = await pool.query(
      'SELECT * FROM financial_transactions WHERE company_id = ?',
      [req.params.companyId]
    );
    const totalRevenue = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netIncome = totalRevenue - totalExpenses;

    // Variação mês a mês (exemplo simples)
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthRevenue = transactions.filter(t => t.type === 'income' && new Date(t.date).getMonth() === now.getMonth()).reduce((sum, t) => sum + t.amount, 0);
    const lastMonthRevenue = transactions.filter(t => t.type === 'income' && new Date(t.date).getMonth() === lastMonth.getMonth()).reduce((sum, t) => sum + t.amount, 0);
    const revenueChange = lastMonthRevenue ? (((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1) : 0;

    const thisMonthExpenses = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === now.getMonth()).reduce((sum, t) => sum + t.amount, 0);
    const lastMonthExpenses = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === lastMonth.getMonth()).reduce((sum, t) => sum + t.amount, 0);
    const expensesChange = lastMonthExpenses ? (((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100).toFixed(1) : 0;

    res.json({
      totalRevenue,
      totalExpenses,
      netIncome,
      revenueChange,
      expensesChange,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contas a pagar/receber
exports.createAccount = async (req, res) => {
  // Exemplo de uso do pool:
  // await pool.query('INSERT INTO accounts (...) VALUES (...)', [...]);
  // TODO: implementar lógica
};
exports.listAccounts = async (req, res) => {/* TODO */};
exports.payAccount = async (req, res) => {/* TODO */};

// Conciliação bancária
exports.importBankStatement = async (req, res) => {/* TODO */};
exports.reconcileBank = async (req, res) => {/* TODO */};

// Reservas financeiras
exports.createReserve = async (req, res) => {/* TODO */};
exports.listReserves = async (req, res) => {/* TODO */};

// Precificação
exports.calculatePricing = async (req, res) => {/* TODO */};

// Estoque
exports.addInventoryMovement = async (req, res) => {/* TODO */};
exports.listInventory = async (req, res) => {/* TODO */};

// Relatórios financeiros
exports.financialReport = async (req, res) => {/* TODO */};

// Integração contábil
exports.exportAccounting = async (req, res) => {/* TODO */};

// Emissão de nota fiscal/boletos
exports.issueInvoice = async (req, res) => {/* TODO */};
exports.issueBoleto = async (req, res) => {/* TODO */};

// Previsão de fluxo de caixa
exports.cashflowForecast = async (req, res) => {/* TODO */};

module.exports = {
  listTransactions,
  createTransaction,
  financialSummary,
  createAccount: exports.createAccount,
  listAccounts: exports.listAccounts,
  payAccount: exports.payAccount,
  importBankStatement: exports.importBankStatement,
  reconcileBank: exports.reconcileBank,
  createReserve: exports.createReserve,
  listReserves: exports.listReserves,
  calculatePricing: exports.calculatePricing,
  addInventoryMovement: exports.addInventoryMovement,
  listInventory: exports.listInventory,
  financialReport: exports.financialReport,
  exportAccounting: exports.exportAccounting,
  issueInvoice: exports.issueInvoice,
  issueBoleto: exports.issueBoleto,
  cashflowForecast: exports.cashflowForecast,
}; 