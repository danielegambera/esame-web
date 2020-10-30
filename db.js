'use strict';

const sqlite = require('sqlite3').verbose();

const DBSOURCE = './esame.db';

const db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        // cannot open database
        console.err(err.message);
        throw err;
    }
});

module.exports = db;
