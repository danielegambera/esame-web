'use strict';

// DAO (Data Access Object) module for accessing

const Episodio = require("./episodio");

const db = require('./db');
const moment = require('moment');

const createEpisodio = function (dbEpisodio) {
    return new Episodio(dbEpisodio.id, dbEpisodio.titolo, dbEpisodio.descrizione, dbEpisodio.audio, dbEpisodio.sponsor, dbEpisodio.prezzo, moment.utc(dbEpisodio.data), dbEpisodio['user_id']);
}

exports.getAllEpisodi = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM episodi';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err);
            else {
                let episodi = rows.map((row) => createEpisodio(row));
                resolve(episodi);
            }
        });
    });
}

exports.getEpisodio = function (id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM episodi WHERE id = ? AND user_id = ?';
        db.get(sql, [id, userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Episodio not found.'
                });
            else {
                const episodio = createEpisodio(row);
                resolve(episodio);
            }
        });
    });
}

exports.getPreferiti = function (userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT episodi.name, episodi.id FROM episodi INNER JOIN preferiti ON preferiti.episodio_id, preferiti.user_id=?';
        db.get(sql, [userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Episodio not found.'
                });
            else {
                const episodio = createEpisodio(row);
                resolve(episodio);
            }
        });
    });
}

exports.getAcquistati = function (userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT episodi.name, episodi.id FROM acquistati INNER JOIN acquistati ON acquistati.episodio_id, acquistati.user_id=?';
        db.get(sql, [userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Episodio not found.'
                });
            else {
                const episodio = createEpisodio(row);
                resolve(episodio);
            }
        });
    });
}

exports.addEpisodio = function (episodio) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO episodi(titolo, descrizione, audio, sponsor, prezzo, data, user_id) VALUES(?,?,?,?,?,?,?)';
        db.run(sql, [episodio.titolo, episodio.descrizione, episodio.audio, episodio.sponsor, episodio.prezzo, episodio.data, podcast.userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

exports.addPreferiti = function (episodioId, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO preferiti(episodio_id, user_id) VALUES(?,?)';
        db.run(sql, [episodioId, userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

exports.addAcquistati = function (episodioId, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO acquistati(episodio_id, user_id) VALUES(?,?)';
        db.run(sql, [episodioId, userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

exports.updateEpisodio = function (id, newEpisodio) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE episodio SET titolo = ?, descrizione = ?, audio = ?, sponsor = ?, prezzo = ?, WHERE id = ? AND user_id = ?';
        db.run(sql, [newEpisodio.titolo, newEpisodio.descrizione, newEpisodio.audio, newEpisodio.sponsor, newEpisodio.prezzo, id, newPodcast.userId], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0)
                resolve({
                    error: 'Episodio not found.'
                });
            else {
                resolve();
            }
        })
    });
}

exports.deleteEpisodio = function (id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM episodi WHERE id = ? AND user_id = ?';
        db.run(sql, [id, userId], function (err) {
            if (err)
                reject(err);
            else if (this.changes === 0)
                resolve({
                    error: 'Episodio not found.'
                });
            else {
                resolve();
            }
        });
    });
}

exports.deletePreferiti = function (id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM preferiti WHERE id = ? AND user_id = ?';
        db.run(sql, [id, userId], function (err) {
            if (err)
                reject(err);
            else if (this.changes === 0)
                resolve({
                    error: 'Episodio not found.'
                });
            else {
                resolve();
            }
        });
    });
}