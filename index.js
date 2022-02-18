const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    console.log(path.join(__dirname, '/index.html'));
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});
