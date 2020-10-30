'use strict';

// DAO (Data Access Object) module for accessing

const Podcast = require('./podcast');

const db = require('./db');
const moment = require('moment');

const createPodcast = function (dbPodcast) {
    return new Podcast(
        dbPodcast.id, 
        dbPodcast.titolo, 
        dbPodcast.descrizione, 
        dbPodcast.categoria, 
        dbPodcast.immagine,
        dbPodcast.data, 
        dbPodcast['user_id']
    );
}

exports.getAllPodcast = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM podcasts';
        db.get(sql, (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                const podcast = createPodcast(row);
                resolve(podcast);
            }
        });
    });
}

exports.getSeguiti = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM podcasts';
        db.get(sql, (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                const podcast = createPodcast(row);
                resolve(podcast);
            }
        });
    });
}

exports.getPreferiti = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM podcasts';
        db.get(sql, (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                const podcast = createPodcast(row);
                resolve(podcast);
            }
        });
    });
}

exports.getAcquistati = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM podcasts';
        db.get(sql, (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                const podcast = createPodcast(row);
                resolve(podcast);
            }
        });
    });
}

exports.getPersonali = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM podcasts';
        db.get(sql, (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                const podcast = createPodcast(row);
                resolve(podcast);
            }
        });
    });
}

exports.getPodcast = function (id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM podcasts WHERE id = ? AND user_id = ?';
        db.get(sql, [id, userId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                const podcast = createPodcast(row);
                resolve(podcast);
            }
        });
    });
}

exports.addPodcast = function (podcast) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO podcasts(titolo, descrizione, categoria, immagine, data, user_id) VALUES(?,?,?,?,?,?)';
        db.run(sql, [podcast.titolo, podcast.descrizione, podcast.categoria, podcast.immagine, podcast.data, podcast.userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

exports.updatePodcast = function (id, newPodcast) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE podcasts SET titolo = ?, descrizione = ?, categoria = ?, immagine = ?, WHERE id = ? AND user_id = ?';
        db.run(sql, [newPodcast.titolo, newPodcast.descrizione, newPodcast.categoria, newPodcast.immagine, id, newPodcast.userId], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0)
                resolve({
                    error: 'Podcast not found.'
                });
            else {
                resolve();
            }
        })
    });
}

exports.deletePodcast = function(id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM podcasts WHERE id = ? AND user_id = ?';
        db.run(sql, [id, userId], function(err) {
            if(err)
                reject(err);
            else if (this.changes === 0)
                resolve({error: 'Podcast not found.'});
            else {
                resolve();
            }
        });
    });
}
