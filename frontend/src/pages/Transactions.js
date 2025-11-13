import React, {useEffect, useState} from 'react';
import { getTransactions, deposit, withdraw } from '../api';
import Modal from '../components/Modal';

export default function Transactions(){
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('deposit'); // or withdraw
  const [amount, setAmount] = useState('');

  async function load(){
    setLoading(true);
    const data = await getTransactions();
    if(data.error) { alert(data.error); setLoading(false); return; }
    setTransactions(data.transactions);
    setBalance(data.balance);
    setLoading(false);
  }

  useEffect(()=>{ load(); }, []);

  async function open(m){
    setMode(m);
    setAmount('');
    setShowModal(true);
  }

  async function submit(){
    const fn = mode === 'deposit' ? deposit : withdraw;
    const res = await fn(amount);
    if(res.error) {
      alert(res.error);
    } else {
      setBalance(res.balance);
      await load();
      setShowModal(false);
    }
  }

  return (
    <div className="card">
      <h2>Your Transactions</h2>
      <div className="balance">Available Balance: ₹{parseFloat(balance).toFixed(2)}</div>
      <div className="actions">
        <button onClick={()=>open('deposit')}>Deposit</button>
        <button onClick={()=>open('withdraw')}>Withdraw</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="tx">
          <thead><tr><th>Type</th><th>Amount</th><th>Balance After</th><th>Date</th></tr></thead>
          <tbody>
            {transactions.map(t=>(
              <tr key={t.id}>
                <td>{t.type}</td>
                <td>₹{Number(t.amount).toFixed(2)}</td>
                <td>₹{Number(t.balance_after).toFixed(2)}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal visible={showModal} onClose={()=>setShowModal(false)}>
        <h3>{mode === 'deposit' ? 'Deposit' : 'Withdraw'}</h3>
        <div>Available balance: ₹{parseFloat(balance).toFixed(2)}</div>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <div style={{marginTop:10}}>
          <button onClick={submit}>{mode === 'deposit' ? 'Deposit' : 'Withdraw'}</button>
        </div>
      </Modal>
    </div>
  );
}
