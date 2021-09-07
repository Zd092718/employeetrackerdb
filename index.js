const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./linkdb.js');

console.log('Welcome to the Employee Tracker Database!');
function init(){

inquirer.prompt(
 [
    {
        type: 'list',
        name: 'mainmenu',
        message: 'What would you like to do? (Use arrow keys to choose)',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        filter(val) {
          return val.toLowerCase();
        },
    }
]
)
.then((choice) => {
  showDb(choice);
  addDepartment(choice);  
})

};

function showDb(data){
  if(data.mainmenu === 'view all departments'){
    const showDbQuery = new Department()
    showDbQuery.showDep(data)
    console.log('  ')
    init();
    } else if (data.mainmenu === 'view all roles'){
      const showDbQuery = new Role()
      showDbQuery.showRole(data);
      init();
    } else if (data.mainmenu === 'view all employees'){
      const showDbQuery = new Employee()
      showDbQuery.showEmp(data);
      init();
    } 
};

function addDepartment(data){
  if(data.mainmenu === 'add a department'){
    inquirer.prompt([
      {
        type: 'input',
        name: 'dep_name',
        message: "What's the name of the department",
      },
    ])
    .then((data) => {
      const addTo = new Department()
      addTo.addDep(data.dep_name)
      console.log(addTo)
      init();
    })
  }
}
function addRole(data){
  if(data.mainmenu === 'add a role'){
    inquirer.prompt([
      {
        type: 'input',
        name: 'role_name',
        message: "What's the name of the role",
      },
      {
        type: 'input',
        name: 'salary',
        message: "What's the salary for the role",
      },
      {
        type: 'input',
        name: 'dep_name',
        message: "What's the department for the role",
      },
    ])
    .then((data) => {
      const addTo = new Role()
      addTo.addRole(data.role_name, data.salary, data.dep_name)
    })
  }
}
function addEmployee(data){
  if(data.mainmenu === 'add an employee'){
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What's the first name of the employee",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What's the last name of the employee",
      },
      {
        type: 'input',
        name: 'role_name',
        message: "What's the employee's role",
      },
      {
        type: 'input',
        name: 'manager_name',
        message: "What's the name of this employee's manager",
      },
    ])
    .then((data) => {
      const addTo = new Employee()
      addTo.addEmp(data)
    })
  }
}
init();