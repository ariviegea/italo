const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

const apartments = [
    {
        title: 'Consell de cent',
        description: 'BLABLABLA',
        available: true,
    },
    {
        title: 'Paral.lel 21',
        description: 'BLABLABLA',
        available: true,
    }
]

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET
app.get('/api/apartments', (req, res) => {
    res.status(200).json(apartments);
});

app.listen(port, () => console.log(`Server running in port ${port}`));
