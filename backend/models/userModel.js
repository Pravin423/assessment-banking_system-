const db = require('./db');

async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
}

async function findByToken(token) {
  const [rows] = await db.query('SELECT * FROM Users WHERE access_token = ?', [token]);
  return rows[0];
}


async function findById(id) {
  const [rows] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
  return rows[0];
}


async function updateToken(userId, token) {
  await db.query('UPDATE Users SET access_token = ? WHERE id = ?', [token, userId]);
}


async function updateBalance(userId, newBalance) {
  await db.query('UPDATE Users SET balance = ? WHERE id = ?', [newBalance, userId]);
}


async function listCustomers() {
  const [rows] = await db.query('SELECT id, name, email, balance FROM Users WHERE role = "customer"');
  return rows;
}

module.exports = { findByEmail, findByToken, updateToken, updateBalance, findById, listCustomers };
