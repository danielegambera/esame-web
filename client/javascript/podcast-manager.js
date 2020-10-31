import Podcast from "./podcast.js";


class PodcastManager {
    constructor() {
        this.podcasts = [];
        this.seguiti = [];
        this.preferiti = [];
        this.acquistati = [];
    }

    //prendi tutti i podcasts
    async getAllPodcasts() {
        let response = await fetch('/api/podcasts');
        const podcastsJson = await response.json();
        if (response.ok) {
            this.podcasts = podcastsJson.map((ex) => Podcast.form(ex));
            return this.podcasts;
        } else {
            throw podcastsJson;
        }
    }

    //prendi i seguiti
    async getAllSeguiti() {
        let response = await fetch('/api/seguiti');
        const seguitiJson = await response.json();
        if (response.ok) {
            this.seguiti = seguitiJson.map((ex) => Podcast.form(ex));
            return this.seguiti;
        } else {
            throw seguitiJson;
        }
    }

    //prendi i preferiti
    async getAllPreferiti() {
        let response = await fetch('/api/preferiti');
        const preferitiJson = await response.json();
        if (response.ok) {
            this.preferiti = preferitiJson.map((ex) => Podcast.form(ex));
            return this.preferiti;
        } else {
            throw preferitiJson;
        }
    }

    //prendi i acquistati
    async getAllAcquistati() {
        let response = await fetch('/api/acquistati');
        const acquistatiJson = await response.json();
        if (response.ok) {
            this.acquistati = acquistatiJson.map((ex) => Podcast.form(ex));
            return this.acquistati;
        } else {
            throw acquistatiJson;
        }
    }

    //aggiungi podcast
    async addPodcast(podcast) {
        let response = await fetch('/api/podcasts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(podcast),
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

    //aggiungi podcast
    async addSegui(podcastId, userId) {
        let response = await fetch('/api/seguiti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(podcastId, userId),
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

    async addPreferiti(podcastId, userId) {
        let response = await fetch('/api/preferiti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(podcastId, userId),
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

    async addAcquistati(podcastId, userId) {
        let response = await fetch('/api/acquistati', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(podcastId, userId),
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

    //update podcast
    async updatePodcast(podcast) {
        let response = await fetch(`/api/podcasts/${podcast.id}`, {
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

    //cancella podcast
    async deletePodcast(podcastId) {
        let response = await fetch(`/api/podcasts/${podcastId}`, {
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

    async deleteSeguiti(podcastId) {
        let response = await fetch(`/api/seguiti/${podcastId}`, {
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

    async deletePreferiti(podcastId) {
        let response = await fetch(`/api/preferiti/${podcastId}`, {
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

    async deleteAcquistati(podcastId) {
        let response = await fetch(`/api/acquistati/${podcastId}`, {
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

export default PodcastManager;