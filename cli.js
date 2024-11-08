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
        // do something
    } else if (answers === 'view all roles') {
        // do something
    } else if (answers === 'view all employees') {
        // do something
    } else if (answers === 'add a department') {
        // do something
    } else if (answers === 'add a role') {
        // do something
    } else if (answers === 'add an employee') {
        // do something
    } else if (answers === 'update an employee') {
        // do something
    } else {
        console.log('Invalid input');
    }
});