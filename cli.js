import inquirer from 'inquirer';
const inquirer = require('inquirer');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee-tracker_db',
    password: 'liam',
    port: 5432
});

async function viewDepartments(){
    await client.connect();
    const res = await client.query('SELECT * FROM departments');
    console.table(res.rows);
    client.end();
}
async function viewRoles(){
    await client.connect();
    const res = await client.query('SELECT * FROM roles');
    console.table(res.rows);
    client.end();
}
async function viewEmployees(){
    await client.connect();
    const res = await client.query('SELECT * FROM employees');
    console.table(res.rows);
    client.end();
}


const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What do you want to do?',
        choices: ['view all departments', 'view all roles', 'view all employees',
             'add a department', 'add a role', 'add an employee', 'update an employee']
    },
]
.then(answers => {
    if (answers === 'view all departments') {
        viewDepartments();
    } else if (answers === 'view all roles') {
        viewRoles();
    } else if (answers === 'view all employees') {
        viewEmployees();
    } else if (answers === 'add a department') {
        const departmentQuestions = [
            {
                type: 'number',
                name: 'id',
                message: 'What is the id of the department?'
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]
    } else if (answers === 'add a role') {
        const roleQuestions = [
            {
                type: 'number',
                name: 'id',
                message: 'What is the id of the role?'
            },
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'number',
                name: 'department',
                message: 'which department does the role belong to?'
            }
        ]
    } else if (answers === 'add an employee') {
        const employeeQuestions = [
            {
                type: 'number',
                name: 'id',
                message: 'What is the id of the employee?'
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'number',
                name: 'role',
                message: 'What is the role of the employee?'
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager of the employee?',
                choices: employeeChoices // this should be an array of objects with id and name properties using the employees table from sql
                // need to create function to pull employees from sql
            }
        ]
    } else if (answers === 'update an employee') {
        const updateEmployeeQuestions = [
            {
                type: 'list',
                name: 'pickEmployee',
                message: 'Which employee do you want to update?',
                choices: employeeChoices
            }
        ]
    } else {
        console.log('Invalid input');
    }
});