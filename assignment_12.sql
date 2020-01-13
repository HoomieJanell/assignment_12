DROP DATABASE IF EXISTS assignment_12_db;

CREATE DATABASE assignment_12_db;

USE DATABASE assignment_12_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    primary key (id)
);

CREATE TABLE role_job (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT,
    primary key (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    primary key (id)
);
