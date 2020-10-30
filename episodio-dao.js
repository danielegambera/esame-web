'use strict';

// DAO (Data Access Object) module for accessing

const Episodio = require("./episodio");

const db = require('./db');
const moment = require('moment');

const createEpisodio = function (dbEpisodio) {
    return new Episodio(dbEpisodio.id, dbEpisodio.titolo, dbEpisodio.descrizione, dbEpisodio.audio, dbEpisodio.sponsor, dbEpisodio.prezzo, dbEpisodio.data ,dbEpisodio['user_id']);
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