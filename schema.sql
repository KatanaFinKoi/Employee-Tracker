CREATE DATABASE IF NOT EXISTS 'employee-tracker_db';

\c employee-tracker_db;

CREATE TABLE department {
    id serial PRIMARY KEY,
    name VARCHAR(30) NOT NULL
}

CREATE TABLE role {
    id serial PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
}

CREATE TABLE employee {
    id serial PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
}