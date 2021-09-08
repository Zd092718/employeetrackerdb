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

async function depTable(data){
    const showDbQuery =  new Department()
    showDbQuery.showDep(data)
    console.log('/n')
    init();
}
async function roleTable(data){
    const showDbQuery = new Role()
    showDbQuery.showRole(data)
    console.log('/n')
    init();
}
async function empTable(data){
    const showDbQuery = new Employee()
    showDbQuery.showEmp(data)
    console.log('/n')
    init();
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

    const [depQuery] = await db.query(`SELECT dep_name as Department, id  FROM department`)
    // const [idQuery] = await db.query(`SELECT department_id from emp_role INNER JOIN department ON emp_role.department_id = department.id`)

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
          name: 'department',
          message: "What's the department for the role",
          choices: depQuery.map(department => ({name:department.Department, value: department}))
        },
      ])
      .then((res) => {
        const addTo = new Role()
        // const id = data.dep_name.Department = data.dep_name.value
        addTo.addRole(res.title, res.salary, res.department.id)
        console.log(`Added ${res.title} to the database!`)
        console.log(res.department.id)
        init();
      })
    }
//Adds employee to db
async function addEmployee(data){
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
  const [roleQuery] = await db.query(`SELECT title from emp_role`)
  console.log(roleQuery)
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
        type: 'list',
        name: 'role_name',
        message: "What's this employee's role",
        choices: roleQuery.map(employee => ({title:employee.Role, value: employee}))
      },
      {
        type: 'input',
        name: 'manager_name',
        message: "What's the name of this employee's manager",
      },
    ])
    .then((data) => {
      const addTo = new Employee()
      addTo.addEmp(data.first_name, data.last_name, data.role_name.Role, data.manager_name)
      console.log(data)
    })
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
