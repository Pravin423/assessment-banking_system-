import React, {useState} from 'react';
import { login } from '../api';

export default function Login({onLogin}){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  async function submit(e){
    e.preventDefault();
    const data = await login(email,password);
    if(data.error) setError(data.error);
    else {
      onLogin({...data});
    }
  }

  return (
    <div className="card">
      <h2>Customer Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <div className='error'>{error}</div>}
      
    </div>
  );
}
