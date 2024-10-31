const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

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
    static getDbServiceInstance() { // only one instance is sufficient
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            // use await to call an asynchronous function
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
                connection.query(query,
                    (err, results) => {
                        if (err) reject(new Error(err.message));
                        else resolve(results);
                    }
                );
            }
            );

            // console.log("dbServices.js: search result:");
            // console.log(response);  // for debugging to see the result of select
            return response;

        } catch (error) {
            console.log(error);
        }
    }


    async registerUser(username, password, age, salary) {
        try {
        const response = await new Promise((resolve, reject) => {
            const query = "INSERT INTO users (username, password, age, salary, registerday) VALUES (?, ?, ?, ?, CURDATE())";
            connection.query(query, [username, password, age, salary], (err, result) => {
                if (err) reject(new Error(err.message));
                else resolve({ id: result.insertId });
            });
        });
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
    }

    async signInUser(username, password) {
        try {
            const user = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE username = ?";
                connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else if (results.length === 0) reject(new Error("User not found"));
                    else resolve(results[0]);
                });
            });
            const isMatch = user.password === password;
            return isMatch;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async searchByName(firstname, lastname) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE firstname = ? AND lastname = ?";
                connection.query(query, [firstname, lastname], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Implement other methods for additional search functionalities

}

module.exports = DbService;
