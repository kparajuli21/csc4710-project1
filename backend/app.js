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

// Additional search functionalities...

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
