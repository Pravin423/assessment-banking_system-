const userModel = require('../models/userModel');
const accountModel = require('../models/accountModel');

async function listAccounts(req, res){
  if(req.user.role !== 'banker') return res.status(403).json({error:'Forbidden'});
  const users = await userModel.listCustomers();
  res.json({ customers: users });
}

async function viewCustomerTransactions(req, res){
  if(req.user.role !== 'banker') return res.status(403).json({error:'Forbidden'});
  const userId = req.params.userId;
  const tx = await accountModel.getTransactionsForUser(userId);
  res.json({ transactions: tx });
}

module.exports = { listAccounts, viewCustomerTransactions };
