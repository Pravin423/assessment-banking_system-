const userModel = require('../models/userModel');

async function authMiddleware(req, res, next){
  const header = req.headers['authorization'];
  if(!header) return res.status(401).json({error:'Missing Authorization header'});
  const token = header.replace('Bearer ','').trim();
  if(!token) return res.status(401).json({error:'Invalid token'});
  const user = await userModel.findByToken(token);
  if(!user) return res.status(401).json({error:'Invalid token'});
  req.user = user;
  next();
}

module.exports = authMiddleware;
