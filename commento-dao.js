'use strict';

// DAO (Data Access Object)

const Commento = require("./commento");

const db = require('./db');
//const moment = require('moment');

const createCommento = function (dbCommento) {
    return new Commento(dbCommento.id, dbCommento.titolo, dbCommento.testo, moment.utc(dbCommento.data), dbCommento['user_id']);
}

exports.getAllCommenti = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM commenti';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err);
            else {
                let commenti = rows.map((row) => createCommento(row));
                resolve(commenti);
            }
        });
    });
}

exports.getCommento = function (id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM commenti WHERE id = ? AND user_id = ?';
        db.get(sql, [id, userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Commento not found.'
                });
            else {
                const commento = createCommento(row);
                resolve(commento);
            }
        });
    });
}

exports.addCommento = function (commento) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO commenti(titolo, testo, data, user_id) VALUES(?,?,?,?)';
        db.run(sql, [commento.titolo, commento.testo, commento.data, commento.userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

exports.updateCommento = function (id, newCommento) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE commenti SET titolo = ?, testo = ?, WHERE id = ? AND user_id = ?';
        db.run(sql, [newCommento.titolo, newCommento.testo, id, newCommento.userId], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0)
                resolve({
                    error: 'Commento not found.'
                });
            else {
                resolve();
            }
        })
    });
}

exports.deleteCommento = function (id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM commenti WHERE id = ? AND user_id = ?';
        db.run(sql, [id, userId], function (err) {
            if (err)
                reject(err);
            else if (this.changes === 0)
                resolve({
                    error: 'Commento not found.'
                });
            else {
                resolve();
            }
        });
    });
}
