
const bcrypt = require('bcrypt');
const db = require('./models/db');

async function run(){
  const conn = await db.getConnection();
  try{
    await conn.query("USE Bank");
 
    const pass = await bcrypt.hash('password', 10);
    await conn.query("INSERT INTO Users (name,email,password_hash,role,balance) VALUES (?,?,?,?,?)",
      ['Admin','admin@gmail.com',pass,'banker',0.00]);
    await conn.query("INSERT INTO Users (name,email,password_hash,role,balance) VALUES (?,?,?,?,?)",
      ['TestName1','test1@gmail.com',pass,'customer',1000.00]);
    await conn.query("INSERT INTO Users (name,email,password_hash,role,balance) VALUES (?,?,?,?,?)",
      ['TestName2','test2@gmail.com',pass,'customer',500.00]);
    console.log('Seeded users. Password for all is: password');
  }catch(e){
    console.error(e);
  }finally{
    conn.release();
    process.exit(0);
  }
}

run();
