const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function authHeader(){
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': 'Bearer ' + token } : {};
}

export async function login(email, password){
  const res = await fetch(API_URL + '/api/auth/login', {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})
  });
  return res.json();
}

export async function getTransactions(){
  const res = await fetch(API_URL + '/api/transactions', { headers: {...authHeader()} });
  return res.json();
}

export async function deposit(amount){
  const res = await fetch(API_URL + '/api/transactions/deposit', {
    method:'POST', headers:{'Content-Type':'application/json', ...authHeader()}, body:JSON.stringify({amount})
  });
  return res.json();
}

export async function withdraw(amount){
  const res = await fetch(API_URL + '/api/transactions/withdraw', {
    method:'POST', headers:{'Content-Type':'application/json', ...authHeader()}, body:JSON.stringify({amount})
  });
  return res.json();
}

export async function getAccounts(){
  const res = await fetch(API_URL + '/api/accounts', { headers: {...authHeader()} });
  return res.json();
}

export async function getCustomerTransactions(userId){
  const res = await fetch(API_URL + '/api/accounts/' + userId + '/transactions', { headers: {...authHeader()} });
  return res.json();
}
