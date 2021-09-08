const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { Department, Role, Employee} = require('./linkdb.js');


let db;



 



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

.then(res => {
  const choice = res.mainmenu;
  switch(choice){
    case 'view all departments':
      depTable(res)
      break;
    case 'view all roles':
      roleTable(res)
      break;
    case 'view all employees':
      empTable()
      break;
    case 'add a department':
      addDepartment(res)
      break;
    case 'add a role':
      addRole(res)
      break;
    case 'add an employee':
      addEmployee(res)
      break;
    case 'update an employee role':
      updateEmployee(res)
      break;
  }})}
// .then((choice) => {  
//   console.log(choice)
//   showDb(choice);
//   addDepartment(choice); 
//   addRole(choice); 
//   addEmployee(choice);
//   updateEmployee(choice);})

// }


// const showDb = (data) =>{
//   if(data.mainmenu === 'view all departments'){
//     const showDbQuery = new Department()
//     showDbQuery.showDep(data)
//     } else if (data.mainmenu === 'view all roles'){
//       const showDbQuery = new Role()
//       showDbQuery.showRole(data);
//     } else if (data.mainmenu === 'view all employees'){
//       const showDbQuery = new Employee()
//       showDbQuery.showEmp(data);
//     } 
// };

 async function depTable(data){
    const showDbQuery =  new Department()
    showDbQuery.showDep(data)
}
const roleTable = (data) => {
    const showDbQuery = new Role()
    showDbQuery.showRole(data)
}
const empTable = (data) => {
    const showDbQuery = new Employee()
    showDbQuery.showEmp(data)
}
//Adds department to db
function addDepartment(data){
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
      console.log(`Added ${data.dep_name} to the database!`);
      init();
    })
  }



  async function addRole(data){ 
  let db = await mysql.createConnection(
      {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: '',
        database: 'employees_db'
      },
      console.log(`Connected to the employees_db database.`)
    );

    const [depQuery] = await db.query(`SELECT dep_name as Department FROM department`)
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: "What's the name of the role",
        },
        {
          type: 'input',
          name: 'salary',
          message: "What's the salary for the role",
        },
        {
          type: 'list',
          name: 'dep_name',
          message: "What's the department for the role",
          choices: depQuery.map(employee => ({name:employee.Department, value: employee}))
        },
      ])
      .then((data) => {
        const addTo = new Role()
        addTo.addRole(data.title, data.salary, data.dep_name)
        console.log(`Added ${data.title} to the database!`)
        console.log(addTo)
        init();
      })
    }
//Adds employee to db
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
      addTo.addEmp(data.first_name, data.last_name, data.role_name, data.manager_name)
      console.log(addTo)
    })
  }
}
//Updates employee to db
function updateEmployee(data){
  if(data.mainmenu === 'update an employee role'){
  inquirer.prompt([
    {
      type: 'input',
      name: 'role_name',
      message: "What's the employee's new role",
    },
  ])
  .then((data) => {
    const addTo = new Role()
    addTo.addRole(data.dep_name, data.role_name, data.salary)
    console.log(addTo)
  })
}
}
init();
