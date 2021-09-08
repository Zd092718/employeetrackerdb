const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
let db;

(async function(){


    db = await mysql.createConnection(
            {
              host: 'localhost',
              // MySQL username,
              user: 'root',
              password: '',
              database: 'employees_db'
            },
            console.log(`Connected to the employees_db database.`)
          );
})()
    
class Department{
    constructor(id, dep_name){
        this.id = id;
        this.dep_name = dep_name;
    }
  async showDep(data){
        const [departmentResult] = await db.query(`SELECT dep_name as Department FROM department`);
        console.table(departmentResult);
    };
    async addDep(data){
       await db.query(`INSERT INTO department VALUES (id, ?)`, data);
    }
    }



class Role extends Department{
    constructor(title, salary, dep_name){
        super(dep_name)
        this.title = title;
        this.salary = salary;
        // this.dep_name = this.dep_name;
    };
    async showRole(data){
        const [roleResult] = await db.query(`SELECT title as Title, salary as Salary, dep_name as Department FROM emp_role INNER JOIN department ON emp_role.department_id = department.id`);
        console.table(roleResult);
    }
    async addRole(data1, data2, data3){
        const datavalues = [data1, data2, data3]
        await db.query(`INSERT INTO emp_role VALUES (id, ?)`, [datavalues])
    }
};

function addRole(data){ 
  const [depQuery] = db.query(`SELECT dep_name as Department FROM department`)
  // , (err, result) => {
  //   if(err) {
  //       console.error('500')
  //   } else {
  //     return result
  //   }
  // });
  console.log(depQuery)
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
      // {
      //   type: 'list',
      //   name: 'dep_name',
      //   message: "What's the department for the role",
      //   choices: 
      // },
    ])
    .then((data) => {
      const addTo = new Role()
      addTo.addRole(data.title, data.salary, data.dep_name)
      console.log(`Added ${data.title} to the database!`)
      console.log(addTo)
      init();
    })
  }

class Employee extends Department{
    constructor(id, first_name, last_name, role_id, manager_id){
        super(id)
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    showEmp(data){
        db.query(`SELECT first_name as First_Name, last_name as Last_Name, title as Job_Title, dep_name as Department, salary as Salary, manager_id as Manager FROM employee INNER JOIN emp_role ON emp_role.id = employee.role_id INNER JOIN department ON emp_role.department_id = department.id`, (err, result) => {
            if(err) {
                console.error('500')
            } else {
                console.table(result);
            }
    })
    };
    addEmp(data1, data2, data3, data4){
        const values = [data1, data2, data3, data4]
        db.query(`INSERT INTO employee VALUES (?)`, values ,(err, result) => {
            if(err) {
                console.error(err)
            } else {
                console.table(result);
            }
        })
    };
    updateEmp(oldData, newData){
        db.query(`UPDATE employee SET role_id = replace(role_id, ?)`,(oldData, newData), (err, result) => {
            if(err) {
                console.error(err)
            } else {
                console.table(result);
            }
        })
    }
}
//pulls all departments
//pull all roles

//     await connection.execute(`SELECT * FROM emp_role`, (err, result) => {
//         if(err) {
//             console.error('500')
//         } else {
//             console.table(result);
//         }
//     });
// //pulls all employee info
// } else if (data.mainmenu === 'view all employees'){
//     await connection.execute(`SELECT * FROM employee`, (err, result) => {
//         if(err) {
//             console.error('500')
//         } else {
//             console.table(result);
//         }
//     });
// };
// };

// async function addDep(data){
// const connection = await mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // TODO: Add MySQL password here
//     password: '',
//     database: 'employees_db'
//   },
//   console.log(`Connected to the employees_db database.`)
// );
// }

module.exports = { Department, Role, Employee, db };