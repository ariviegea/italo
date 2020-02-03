const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv4 = require('uuid');
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

const apartments = [
    {
        id:uuidv4(),
        title: "Fantastic apartment middle of Barcelona",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        street: "Paral.lel 21",
        flat:"5e 4a",
        city: "Barcelona",
        country: "Spain",
        price: "1000",
        size: "100",
        url: "https://q-cf.bstatic.com/images/hotel/max1024x768/103/103540397.jpg",
        available: true,
    },
    {
        id:uuidv4(),
        title: "Fantastic apartment middle of Tokyo",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        street: "Paral.lel 24",
        flat:"2e 1a",
        city: "Tokyo",
        country: "Japan",
        price: "3000",
        size: "70",
        url: "https://cf.ltkcdn.net/interiordesign/images/std/206259-668x450-Japanese-style-Interior.jpg",
        available: false,
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
app.post('/admin/register', async(req, res) => {
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
app.post('/admin', async(req, res) => {
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

// Get all apartments
app.get('/apartments', (req, res)=> {
    res.status(200).json(apartments);
});

// Get a specific apartment
app.get('/apartments/:id', (req, res) => {
    
    let apartment = apartments.find(apartment => apartment.id === req.params.id);
  
    if (apartment)
      res.status(200).json(apartment);
    else
      res.status(400).json({msg: `Apartment not found with id ${req.params.id}`});
  });

// Create a new apartment 
app.post('/admin/apartments', (req, res) => {
    if(apartments.find(apartment => (apartment.street === req.body.street) && (apartment.flat === req.body.flat))) {
        res.status(400).send({msg: `Apartment with street ${req.body.street} or ${req.body.flat} already exists`});
        return;
    }
    const newApartment = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        street: req.body.street,
        flat: req.body.flat,
        city: req.body.city,
        country: req.body.country,
        price: req.body.price,
        size: req.body.size,
        url: req.body.url,
        available: req.body.available
    }
    apartments.push(newApartment);
 
    res.status(201).send();
 })

module.exports = {
    app,
};
  