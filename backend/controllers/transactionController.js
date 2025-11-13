const userModel = require('../models/userModel');
const accountModel = require('../models/accountModel');

async function getTransactions(req, res){
  const user = req.user;
  const tx = await accountModel.getTransactionsForUser(user.id);
  res.json({ transactions: tx, balance: user.balance });
}

async function deposit(req, res){
  const user = req.user;
  const { amount } = req.body;
  const amt = parseFloat(amount);
  if(isNaN(amt) || amt <= 0) return res.status(400).json({error:'Invalid amount'});
  const newBal = parseFloat(user.balance) + amt;
  await accountModel.createTransaction(user.id, 'deposit', amt, newBal);
  await userModel.updateBalance(user.id, newBal);

  const updated = await userModel.findById(user.id);
  res.json({ balance: updated.balance });
}

async function withdraw(req, res){
  const user = req.user;
  const { amount } = req.body;
  const amt = parseFloat(amount);
  if(isNaN(amt) || amt <= 0) return res.status(400).json({error:'Invalid amount'});
  if(parseFloat(user.balance) < amt) return res.status(400).json({error:'Insufficient Funds'});
  const newBal = parseFloat(user.balance) - amt;
  await accountModel.createTransaction(user.id, 'withdraw', amt, newBal);
  await userModel.updateBalance(user.id, newBal);
  const updated = await userModel.findById(user.id);
  res.json({ balance: updated.balance });
}

module.exports = { getTransactions, deposit, withdraw };
