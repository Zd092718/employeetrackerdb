const inquirer = require('inquirer');
const { showdb, addtodb } = require('./linkdb.js');




const main = [
    {
        type: 'list',
        name: 'mainmenu',
        message: 'What would you like to do? (Use arrow keys to choose)',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        filter(val) {
          return val.toLowerCase();
        },
    }
];



function init(){
inquirer.prompt(main)
.then((data) => showdb(data))
};

init();

module.exports = init;