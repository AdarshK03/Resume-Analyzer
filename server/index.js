const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Server running');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});