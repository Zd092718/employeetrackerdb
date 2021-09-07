const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./linkdb.js');


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
.then((data) => {
  showDb(data);
  
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
init();
// if()