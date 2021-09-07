INSERT INTO department (dep_name)
VALUES ('Accounting'),
       ('R&D'),
       ('Human Resources');

 
INSERT INTO emp_role (title, salary, department_id)
VALUES ('Accountant', 50000, 1),
       ('Engineer', 40000, 2),
       ('HR OFFICER', 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jeff', 'Lewis', 3, 4),
        ('Steve', 'Brewer', 2, 1),
        ('Kate', 'Winslett', 1, 6);
      

 