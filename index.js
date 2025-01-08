const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mainRouter = require('./app/router/mainRouter');

require('dotenv').config();
const PORT = process.env.PORT;
app.use(bodyParser.json());

// Routers
app.use('/api', mainRouter);

// Route not found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})