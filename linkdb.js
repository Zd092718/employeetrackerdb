const mysql = require('mysql2');
const inquirer = require('inquirer');
const init = require('./index.js');

const db = mysql.createConnection(
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
class Department{
    constructor(dep_name){
        this.dep_name = dep_name;
    }
    showDep(data){
        db.query(`SELECT dep_name as Department FROM department`, (err, result) => {
            if(err) {
                console.error('500')
            } else {
                console.table(result);
            }
    })
    };
    addDep(data){
        db.query(`INSERT INTO department VALUES (id, ?)`, data, (err, result) => {
            if(err) {
                console.error(err)
            } else {
                console.log(this.showDep());
            }
        })
    }
}

class Role extends Department{
    constructor(title, salary, dep_name){
        super(dep_name)
        this.title = title;
        this.salary = salary;
        // this.dep_name = this.dep_name;
    };
    showRole(data){
        db.query(`SELECT title as Title, salary as Salary, dep_name as Department FROM emp_role INNER JOIN department ON emp_role.department_id = department.id`, (err, result) => {
            if(err) {
                console.error('500')
            } else {
                console.table(result);
            }
    })
    };
    addRole(data1, data2, data3){
        db.query(`INSERT INTO emp_role ?`, (data1, data2, data3), (err, result) => {
            if(err) {
                console.error(err)
            } else {
                console.log(this.showRole());
            }
        })
    }
};

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
    addEmp(data){
        db.query(`INSERT INTO employee VALUES (?)`, (err, result) => {
            if(err) {
                console.error(err)
            } else {
                console.table(result);
            }
        })
    };
    updateEmp(data){

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

module.exports = { Department, Role, Employee };