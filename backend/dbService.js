const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect(err => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance || (instance = new DbService());
    }

    async registerUser(username, password, age, salary) {
        // Registration logic here
    }

    async signInUser(username, password) {
        // Sign-in logic here
    }

    async searchByName(firstname, lastname) {
        // Search by name logic here
    }

    // Implement other methods for additional search functionalities

}

module.exports = DbService;
