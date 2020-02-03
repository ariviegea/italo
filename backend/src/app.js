const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');


const adminAccess = [
    {
        id: uuidv4(),
        name: 'ricard',
        password: 'ricard123'
    },
    {
        id: uuidv4(),
        name: 'ariadna',
        password: 'ariadna123'
    },
]

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Error middleware
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
    next(err);
  });
  
app.use((err, req, res, next) => {
    res.status(404).send('Error 404 occurred');
    next(err);
  });

// Get all users
app.get('/admin', (req, res)=> {
    res.status(200).json(adminAccess);
});

// Get one user 
app.get('/admin/:id', (req, res) => {
    let user = adminAccess.find(user => user.id === req.params.id);
    if( user ){
        res.status(200).json(user);
    } else {
        res.status(400).json({msg: 'Please fill a real user'});
    }
})

// Send user 
// Create a user admin 
app.post('/admin', async(req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        let user = { 
            id: uuidv4(), 
            name: req.body.name, 
            password: hashPassword 
        }
        adminAccess.push(user);
        res.status(201).send()
    } catch {
        res.status(500);
    } 
});

// Login the admin
app.post('/admin/login', async(req, res) => {
    const user = adminAccess.find(user => user.name === req.body.name);
    if ( user == null) {
        return res.status(400).send('The user can not be found');
    } try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Access not allowed');
        }
    } catch {
        res.status(500).send();
    }
})

module.exports = {
    app,
};
  