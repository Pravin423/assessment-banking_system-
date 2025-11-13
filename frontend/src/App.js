  import React, {useState} from 'react';
  import Login from './pages/Login';
  import BankerLogin from './pages/BankerLogin';
  import Transactions from './pages/Transactions';
  import Accounts from './pages/Accounts';

  export default function App(){
    const [route, setRoute] = useState('login'); 
    const [user, setUser] = useState(null);

    function onLogin(userInfo){
      setUser(userInfo);
      if(userInfo.role === 'banker') setRoute('accounts');
      else setRoute('transactions');
      localStorage.setItem('access_token', userInfo.access_token);
    }

    function logout(){
      localStorage.removeItem('access_token');
      setUser(null);
      setRoute('login');
    }

    return (
      <div className='container'>
        <header className='header'>
          <h1>Banking System</h1>
          <nav>
            <button onClick={()=>setRoute('login')}>Customer Login</button>
            <button onClick={()=>setRoute('banker-login')}>Banker Login</button>
            {user && <button onClick={logout}>Logout</button>}
          </nav>
        </header>

        <main>
          {route === 'login' && <Login onLogin={onLogin} />}
          {route === 'banker-login' && <BankerLogin onLogin={onLogin} />}
          {route === 'transactions' && <Transactions />}
          {route === 'accounts' && <Accounts />}
        </main>
      </div>
    );
  }
