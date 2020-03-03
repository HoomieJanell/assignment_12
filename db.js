var connection = require("./connection");
class DB{
    constructor(connection){
        this.connection = connection;
    }
    createRole(role){
        return this.connection.query("INSERT INTO role set ? ", role)
    }
    findAllDepartments(){
        return this.connection.query("SELECT id from department")
    }
}
module.exports = new DB(connection);