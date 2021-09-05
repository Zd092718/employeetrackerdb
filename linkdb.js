const mysql = require('mysql2');
const inquirer = require('inquirer');
const init = require('./index.js');

async function showdb(data){
const connection = await mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);
//pulls all departments
if(data.mainmenu === 'view all departments'){
    await connection.execute(`SELECT * FROM department`, (err, result) => {
        if(err) {
            console.error('500')
        } else {
            console.table(result);
        }
    });
//pull all roles
} else if (data.mainmenu === 'view all roles'){
    await connection.execute(`SELECT * FROM emp_role`, (err, result) => {
        if(err) {
            console.error('500')
        } else {
            console.table(result);
        }
    });
//pulls all employee info
} else if (data.mainmenu === 'view all employees'){
    await connection.execute(`SELECT * FROM employee`, (err, result) => {
        if(err) {
            console.error('500')
        } else {
            console.table(result);
        }
    });
};
};

async function addtodb(data){
const connection = await mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);
}

module.exports = { showdb, addtodb };