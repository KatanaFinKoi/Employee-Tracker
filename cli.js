import inquirer from 'inquirer';

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
        // do something
    }
});