import React, {useEffect, useState} from 'react';
import { getAccounts, getCustomerTransactions } from '../api';

export default function Accounts(){
  const [customers, setCustomers] = useState([]);
  const [selectedTx, setSelectedTx] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  async function load(){
    const data = await getAccounts();
    if(data.error) return alert(data.error);
    setCustomers(data.customers || []);
  }

  async function viewCustomer(user){
    const data = await getCustomerTransactions(user.id);
    if(data.error) return alert(data.error);
    setSelectedTx(data.transactions);
    setSelectedName(user.name);
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div className="card">
      <h2>All Customer Accounts</h2>
      <div>Total Customers: {customers.length}</div>
      <table className="tx">
        <thead><tr><th>Name</th><th>Email</th><th>Balance</th><th>Action</th></tr></thead>
        <tbody>
          {customers.map(c=>(
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>₹{Number(c.balance).toFixed(2)}</td>
              <td><button onClick={()=>viewCustomer(c)}>View Transactions</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedName && (
        <div style={{marginTop:20}}>
          <h3>Transactions for {selectedName}</h3>
          <table className="tx">
            <thead><tr><th>Type</th><th>Amount</th><th>Balance After</th><th>Date</th></tr></thead>
            <tbody>
              {selectedTx.map(t=>(
                <tr key={t.id}>
                  <td>{t.type}</td>
                  <td>₹{Number(t.amount).toFixed(2)}</td>
                  <td>₹{Number(t.balance_after).toFixed(2)}</td>
                  <td>{new Date(t.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
