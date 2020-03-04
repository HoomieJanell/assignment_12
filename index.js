var inquirer = require('inquirer');
var connection = require("./connection")
const db = require("./db")
function runSearch() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What action would you like to perform?',
            choices: [
                'Add a department',
                'Add a role',
                'Add an employee',
                'Search department',
                'Search employee'
            ]
            //Adding functions based on the option selected above
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmp();
                    break;
                case 'Search department':
                    searchDept();
                    break;
                case 'Search employee':
                    searchEmp();
                    break;
                default: console.log("I don't know What you are talking about");
            }
        });
}
function addDept() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the department name.'
        })
        .then(function (answer) {
            //add a new row in the department table
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.name
                },
                function (err) {
                    if (err) throw err;
                    console.log("You have successfully added a new department!");
                    runSearch();
                }
            );
        });
}
//Add a new role, but search the department table to add a link between the role and department
function addRole() {
    console.log("add role function")
    var departments;
    connection.query("Select id, name from department", function(err, res){
        departments  = res

    console.log(departments)
    const departmentChoices = departments.map(({id, name}) => ({
        name: name,
        value: id
    }));

   // console.log(departmentNames)
    // var query = 'SELECT * FROM department'
    // var depts;
    // connection.query(query, function (err, res) {
    //     if (err) throw err;
    //     console.table(res.map(depts => depts.departmentId + depts.name));
    //     //console.log('The department ids for the corresponding names are as follows:  ' + res.map(depts=>depts.departmentId));
    //     //depts = res.map(depts=>depts.departmentId);
    //     //runSearch();
    // })
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is title or role you would like to enter?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Please enter an annual salary using digit only.'
            },
            {
                name: 'departmentId',
                message: 'Please select a department by entering the correspoding digit.',
                choices: departmentChoices,
            }
        ])
        .then(function (answer) {
            //A new row is created in the role table 
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId
                },
                function (err) {
                    if (err) throw err;
                    console.log("You have successfully added a new role!");
                });
        });
}
    )}
//Add a new Employee
function addEmp() {
    connection.query('SELECT DISTINCT role_id FROM employee',
        //var erole;      
        function (err, res) {
            if (err) throw err;
            console.log("\n")
            console.table(res);
        }),
        inquirer
            .prompt([
                {
                    name: 'role_id',
                    choices: 'role',
                    message: 'Please select a role for by entering the role ID.'
                },
                {
                    name: 'first_name',
                    type: 'input',
                    message: "Enter the employee's first name."
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "Enter the employee's last name."
                },
                {
                    name: 'manager_id',
                    choices: 'rawlist',
                    message: "Please select a manager by entering the manager's employee ID."
                }
            ]).then(function(data){
                console.log("------")
                console.log(data)
                console.log("-------")
                connection.query(
                    'INSERT INTO employee SET ?',data,
                    function (err) {
                        if (err) throw err;
                        console.log("You have successfully added a new employee!");
                    }
                );

            });
}
//Search Employees table for Managers
function searchEmp() {
    connection.query('SELECT employees.employeeId, employees.firstName, employees.lastName, employees.managerId, role.title',
        query += 'FROM employees, role',
        query += 'WHERE employees.roleId = role.roleId',
        function (err, res) {
            if (err) throw err;
            console.table(res);
        })
        .then(function (answer) {
            console.log("SEARH EMPLOEE FUNCTION")
            //A new row is created in the role table 
            connection.query(
                'INSERT INTO employees SET ?',
                {
                    firstName: answer.firstName,
                    lastName: answer.lastName,
                    role_id: answer.roleId,
                    managerId: answer.managerId
                },
                function (err) {
                    if (err) throw err;
                    console.log("You have successfully added a new employee!");
                });
        });
}
runSearch();