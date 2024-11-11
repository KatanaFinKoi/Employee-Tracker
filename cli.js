import inquirer from 'inquirer';
// const inquirer = require('inquirer');
import Client from 'pg';

const client = new Client.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker_db',
    password: 'liam',
    port: 5432
});

async function viewDepartments(){
    try { await client.connect();
        const res = await client.query('SELECT * FROM departments');
        console.table(res.rows);
    } catch (error) {
        console.error('Error viewing departments:', error);
    } finally {
    client.end();
    }
}
async function viewRoles(){
    try { await client.connect();
        const res = await client.query('SELECT * FROM roles');
        console.table(res.rows);
    } catch (error) {
        console.error('Error viewing roles:', error);
    } finally {
    client.end();
    }
}
async function viewEmployees(){
    try { 
        await client.connect();
        const res = await client.query('SELECT * FROM employees');
        console.table(res.rows);
    } catch (error) {
        console.error('Error viewing employees:', error);
    } finally {
    client.end();
    }
}

async function addDepartment(answers) {
    try {
        await client.connect();
        const query = 'INSERT INTO departments (id, name) VALUES ($1, $2)';
        await client.query(query, [answers.id, answers.name]);
        console.log('Department added successfully.');
    } catch (error) {
        console.error('Error adding department:', error);
    } finally {
        client.end();
    }
}

async function addRole(answers) {
    try {
        await client.connect();
        const query = 'INSERT INTO roles (id, title, salary, department_id) VALUES ($1, $2, $3, $4)';
        await client.query(query, [answers.id, answers.title, answers.salary, answers.department]);
        console.log('Role added successfully.');
    } catch (error) {
        console.error('Error adding role:', error);
    } finally {
        client.end();
    }
}

async function addEmployee(answers) {
    try {
        await client.connect();
        const query = 'INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4, $5)';
        await client.query(query, [answers.id, answers.first_name, answers.last_name, answers.role, answers.manager]);
        console.log('Employee added successfully.');
    } catch (error) {
        console.error('Error adding employee:', error);
    } finally {
        client.end();
    }
}

// async function getEmployeeById(employeeId) {
//     await client.connect();
//     const res = await client.query('SELECT * FROM employees WHERE id = $1', [employeeId]);
//     client.end();
//     return res.rows[0];
// }


const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What do you want to do?',
        choices: [
            'view all departments', 
            'view all roles', 
            'view all employees',
            'add a department', 
            'add a role', 
            'add an employee', 
            'update an employee',
            'exit'
        ]
    },
];

const doOption = async (answers) => {

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
        const departmentAnswers = await inquirer.prompt(departmentQuestions);
        await addDepartment(departmentAnswers);

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
        const roleAnswers = await inquirer.prompt(roleQuestions);
        await addRole(roleAnswers);

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
                type: 'number',
                name: 'manager',
                message: 'Who is the manager of the employee?',
                default: null
            }
        ];
        const employeeAnswers = await inquirer.prompt(employeeQuestions);
        await addEmployee(employeeAnswers);

    }
    //  else if (answers === 'update an employee') {
    //     async function updateEmployee() {
    //         try {
    //             const employeeId = await inquirer.prompt([
    //                 {
    //                     type: 'number',
    //                     name: 'employeeId',
    //                     message: 'Enter the ID of the employee you want to update:'
    //                 }
    //             ]);
    //             const currentData = await getEmployeeById(employeeId);
                
    //             if (!currentData) {
    //                 console.log("Employee with this ID does not exist.");
    //                 return;
    //             }
    //             const updateQuestions = [
    //                 {
    //                     type: 'input',
    //                     name: 'first_name',
    //                     message: 'Enter new first name:',
    //                     default: currentData.first_name
    //                 },
    //                 {
    //                     type: 'input',
    //                     name: 'last_name',
    //                     message: 'Enter new last name:',
    //                     default: currentData.last_name
    //                 },
    //                 {
    //                     type: 'number',
    //                     name: 'role_id',
    //                     message: 'Enter new role ID:',
    //                     default: currentData.role_id
    //                 },
    //                 {
    //                     type: 'input',
    //                     name: 'manager_id',
    //                     message: 'Enter new manager ID (leave blank for no manager):',
    //                     default: currentData.manager_id ? currentData.manager_id : ''
    //                 }
    //             ];
        
    //             const newInfo = await inquirer.prompt(updateQuestions);
        
    //             const managerId = newInfo.manager_id ? parseInt(newInfo.manager_id) : null;
        
    //             await client.connect();
    //             const query = `
    //                 UPDATE employees 
    //                 SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 
    //                 WHERE id = $5
    //             `;
    //             await client.query(query, [
    //                 newInfo.first_name,
    //                 newInfo.last_name,
    //                 newInfo.role_id,
    //                 managerId,
    //                 employeeId
    //             ]);
        
    //             console.log('Employee information updated successfully.');
    //         } catch (error) {
    //             console.error('Error updating employee:', error);
    //         }
    //     }

    // } 
    else if (answers === 'exit') {
            
        console.log('Goodbye!');
    
    } else {

        console.log('Invalid input');
    }
}


inquirer
.prompt(questions)
.then((answers) => {
    doOption(answers.options);
});