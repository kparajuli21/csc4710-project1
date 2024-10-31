const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register a new user
app.post('/register', (request, response) => {
    const { username, password, age, salary } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.registerUser(username, password, age, salary);
    result.then(data => response.json({ success: true, id: data.id }))
          .catch(err => response.status(500).json({ success: false, error: err.message }));
});

app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// User sign-in
app.post('/signin', (request, response) => {
    const { username, password } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.signInUser(username, password);
    result.then(data => response.json({ success: data }))
          .catch(err => response.status(500).json({ success: false, error: err.message }));
});

// Search by name
app.get('/searchByName/:firstname/:lastname', (request, response) => {
    const { firstname, lastname } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByName(firstname, lastname);
    result.then(data => response.json({ data: data }))
          .catch(err => response.status(500).json({ error: err.message }));
});

//search by userid
app.get('/searchByID/:userid', (request, response) => {
    const { userid } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByID(userid);
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});

  //search all users whose salary is between X and Y
app.get('/searchBySalary/:x/:y', (request, response) => {
    const { x, y } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchBySalary(parseInt(x), parseInt(y));
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});

//Search all users whose ages are between X and Y.
app.get('/searchByAge/:x/:y', (request, response) => {
    const { x, y } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByAge(parseInt(x), parseInt(y));
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});
//Search users who registered after john registered, where john is the userid.
app.get('/searchByUser/:userid', (request, response) => {
    const {userid} = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByUser(userid);
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});
//search users who never signed in.
app.get('/neverSignedIn', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.searchNeverSignedIn(userid);
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});

//Search users who registered on the same day that john registered.
app.get('/searchSameDay/:userid', (request, response) => {
    const { userid } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchSameDay(userid);
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});

//Return the users who registered today;
app.get('/searchToday', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.searchToday(userid);
    result.then(data => response.json({ data: data }))
        .catch(err => response.status(500).json({ error: err.message }));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
