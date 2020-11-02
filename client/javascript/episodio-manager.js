import Episodio from "./episodio.js";
//import {json} from "express";


class EpisodioManager {
    constructor() {
        this.episodi = [];
        this.preferiti = [];
        this.acquistati = [];
    }

    //prendi tutti i episodi
    async getAllEpisodi() {
        let response = await fetch('/api/episodi');
        const episodiJson = await response.json();
        if (response.ok) {
            this.episodi = episodiJson.map((ex) => Episodio.form(ex));
            return this.episodi;
        } else {
            throw episodiJson;
        }
    }

    //prendi tutti i podcasts
    async getEpisodioId(episodioId) {
        let response = await fetch(`/api/episodi/${episodioId}`);
        const episodiJson = await response.json();
        if (response.ok) {
            this.episodi = episodiJson.map((ex) => Episodio.form(ex));
            return this.episodi;
        } else {
            throw episodiJson;
        }
    }

    //aggiungi episodo
    async addEpisodo(episodio) {
        let response = await fetch('/api/episodi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(episodio),
        });
        if (response.ok) {
            return;
        } else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            } catch (err) {
                if (Array.isArray(err)) {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                    throw `Error: ${errors}`;
                } else
                    throw 'Error: cannot parse server response';
            }
        }
    }

    //update episodo
    async updateEpisodo(episodio) {
        let response = await fetch(`/api/episodi/${episodio.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        });
        if (response.ok) {
            return;
        } else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            } catch (err) {
                if (Array.isArray(err)) {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                    throw `Error: ${errors}`;
                } else
                    throw 'Error: cannot parse server response';
            }
        }
    }

    //cancella Episodo
    async deleteEpisodo(episodioId) {
        let response = await fetch(`/api/episodi/${episodioId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            return;
        } else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            } catch (err) {
                if (Array.isArray(err)) {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                    throw `Error: ${errors}`;
                } else
                    throw 'Error: cannot parse server response';
            }
        }
    }
}

export default EpisodioManager;