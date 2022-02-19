const sqlite3 = require('sqlite3').verbose();

function insert(name, table, row) {
    return new Promise((resolve, reject) => {
        _insert(
            name,
            table,
            row,
            (succes_r) => {
                resolve(succes_r);
            },
            (error_r) => {
                reject(error_r);
            }
        );
    });
}

function select(name, table, conditions) {
    return new Promise((resolve, reject) => {
        _select(
            name,
            table,
            conditions,
            (succes_r) => {
                resolve(succes_r);
            },
            (error_r) => {
                reject(error_r);
            }
        );
    });
}

function _insert(name, table, row, success_cb, error_cb) {
    const db = new sqlite3.Database(name);
    db.run(
        `insert into ${table} (${Object.keys(row).join(', ')})
         values (?, ?, ?, ?);`,
        Object.values(row),
        function (err) {
            if (err) error_cb(err);
            else success_cb(this);
        }
    );
    db.close();
}

function _select(name, table, conditions, success_cb, error_cb) {
    const db = new sqlite3.Database(name);
    db.all(
        `select * from ${table} 
         where ${Object.keys(conditions)
             .map((x) => x + ' = ? ')
             .join('and ')}`,
        Object.values(conditions),
        (err, rows) => {
            if (err) error_cb(err);
            else success_cb(rows);
        }
    );
    db.close();
}

async function test() {
    const result = await insert('prod.db', 'posts', {
        title: 'Test New',
        updated_on: 1645225511,
        created_on: 1645225511,
        created_by: 1,
    });
    console.log(result);
    const rows = await select('prod.db', 'posts', { post_id: result.lastID });
    console.log(rows);
}

module.exports = { insert, select };
