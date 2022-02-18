const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');

const app = express();
app.set('view engine', 'ejs');

app.get('/post/:post_id', (req, res) => {
    fs.readFile(
        path.join(__dirname, `public/${req.params.post_id}.md`),
        'utf-8',
        (err, data) => {
            html = marked.parse(data);
            res.send(html);
        }
    );
});

app.get('/dashboard/editor', (req, res) => {
    res.render('pages/editor');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});
