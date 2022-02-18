const sqlite3 = require('sqlite3').verbose();

console.log('Setting up databases...');
const db = new sqlite3.Database('prod.db');

const fs = require('fs');

fs.readdir('db', (err, files) => {
    files.forEach((file) => {
        fs.readFile('db/' + file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            db.run(data);
        });
    });
});

console.log('Done.');
