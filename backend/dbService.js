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

            //console.log("dbServices.js: search result:");
            //console.log(response);  // for debugging to see the result of select
            return response;

        } catch (error) {
            console.log(error);
        }
    }


    async registerUser(username, password, userid, age, firstname, lastname, salary) {
        try {
        const response = await new Promise((resolve, reject) => {
            const query = "INSERT INTO users (username, password, userid, age, firstname, lastname, salary, registerday) VALUES (?, ?, ?, ?, ?, ?,?, CURDATE())";
            connection.query(query, [username, password, userid, age, firstname, lastname, salary], (err, result) => {
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

    updateLastSignIn(userid) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET signintime = NOW() WHERE userid = ?';
            this.db.query(query, [userid], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
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

    // search users by userid
    async searchByID(userid) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE userid = ?";
                connection.query(query, [userid], (err, results) => {
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
    //search all users whose salary is between X and Y
    async searchBySalary(x, y) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE salary > ? AND salary < ?";
                connection.query(query, [x,y], (err, results) => {
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
    //Search all users whose ages are between X and Y.
    async searchByAge(x, y) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE age > ? AND age < ?";
                connection.query(query, [x, y], (err, results) => {
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
    //Search users who registered after john registered, where john is the userid.
    async searchAfterUser(userid) {
        try {
            const getDate = await new Promise((resolve, reject) => {
                const query = "SELECT registerday FROM users WHERE userid =  ?";
                connection.query(query, [userid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else if (results.length == 0) reject(new Error("User not found"));
                    else resolve(results);
                }); 
            });
            const date = getDate[0].registerday;

            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE registerday > ?";
                connection.query(query, [date], (err, results) => {
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

    //search users who never signed in.
    async searchNeverSignedIn() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE signintime is NULL";
                connection.query(query, (err, results) => {
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
    //Search users who registered on the same day that john registered.
    async searchSameDay(userid) {
        try {
            const getDate = await new Promise((resolve, reject) => {
                const query = "SELECT registerday FROM users WHERE userid =  ?";
                connection.query(query, [userid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else if (results.length == 0) reject(new Error("User not found"));
                    else resolve(results);
                });
            });
            const date = getDate[0].registerday;

            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE registerday = ?";
                connection.query(query, [date], (err, results) => {
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

    //Return the users who registered today;
    async searchToday() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE registerday = CURDATE();";
                connection.query(query, (err, results) => {
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
}

module.exports = DbService;
