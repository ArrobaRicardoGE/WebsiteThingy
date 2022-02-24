const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const db = require('./database');

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

app.get('/dashboard/editor/:post_id', (req, res) => {
    fs.readFile(
        path.join(__dirname, `public/${req.params.post_id}.md`),
        'utf-8',
        (err, data) => {
            res.render('pages/editor', {
                title: req.params.post_id,
                data: data,
            });
        }
    );
});

app.get('/test/:name', async (req, res) => {
    const ans = await db.insert('prod.db', 'posts', {
        title: req.params.name,
        updated_on: 1645225511,
        created_on: 1645225511,
        created_by: 1,
    });
    res.send(ans);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});
