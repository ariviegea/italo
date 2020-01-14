const { app } = require('./app');

const PORT = (process.env.NODE_ENV === 'production')
  ? process.env.PROD_PORT
  : 8888;

app.listen(PORT, () => console.log(`Server running on port ${PORT} `))
