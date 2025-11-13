const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authController = require('./controllers/authController');
const transactionController = require('./controllers/transactionController');
const bankerController = require('./controllers/bankerController');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/auth/login', authController.login);
app.get('/api/transactions', auth, transactionController.getTransactions);
app.post('/api/transactions/deposit', auth, transactionController.deposit);
app.post('/api/transactions/withdraw', auth, transactionController.withdraw);
app.get('/api/accounts', auth, bankerController.listAccounts);
app.get('/api/accounts/:userId/transactions', auth, bankerController.viewCustomerTransactions);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
