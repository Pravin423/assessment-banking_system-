const db = require('./db');

async function createTransaction(userId, type, amount, balance_after){
  const [res] = await db.query('INSERT INTO Accounts (user_id, type, amount, balance_after) VALUES (?,?,?,?)',
    [userId, type, amount, balance_after]);
  return res.insertId;
}

async function getTransactionsForUser(userId){
  const [rows] = await db.query('SELECT * FROM Accounts WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  return rows;
}

module.exports = { createTransaction, getTransactionsForUser };
