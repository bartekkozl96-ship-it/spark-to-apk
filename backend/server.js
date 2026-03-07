const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/generate-app', (req, res) => {
    // Logic to generate app goes here
    res.send('App generated successfully!');
});

app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    // Logic to download the specified file goes here
    res.download(`./downloads/${fileName}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
