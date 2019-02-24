const express = require('express');
const cors = require('cors');

const getAllUsers = require('./routes/getAllUsers');
const login = require('./routes/login');
const editUser = require('./routes/editUser');
const deleteUser = require('./routes/deleteUser');
const addUser = require('./routes/addUser');

const app = express();

app.use(express.json());
app.use(cors())

app.post('/login', login);
app.get('/all', getAllUsers);
app.put('/edit/:id', editUser);
app.delete('/delete/:id', deleteUser);
app.post('/add', addUser);

app.listen(4000);