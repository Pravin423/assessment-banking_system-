const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');

async function login(req, res){
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'email and password required'});
  const user = await userModel.findByEmail(email);
  if(!user) return res.status(401).json({error:'Invalid credentials'});
  const ok = await bcrypt.compare(password, user.password_hash);
  if(!ok) return res.status(401).json({error:'Invalid credentials'});

  const token = uuidv4();
  await userModel.updateToken(user.id, token);
  res.json({ access_token: token, role: user.role, name: user.name, balance: user.balance });
}

module.exports = { login };
