require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const boardRoutes = require('./routes/boardRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/boards', boardRoutes);


sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Board API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
