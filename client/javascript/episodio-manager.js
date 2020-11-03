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

      //prendi i acquistati
      async getAllAcquistati() {
          let response = await fetch('/api/acquistati');
          const acquistatiJson = await response.json();
          if (response.ok) {
              this.acquistati = acquistatiJson.map((ex) => Episodio.form(ex));
              return this.acquistati;
          } else {
              throw acquistatiJson;
          }
      }

         //prendi i preferiti
         async getAllPreferiti() {
             let response = await fetch('/api/preferiti');
             const preferitiJson = await response.json();
             if (response.ok) {
                 this.preferiti = preferitiJson.map((ex) => Episodio.form(ex));
                 return this.preferiti;
             } else {
                 throw preferitiJson;
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

      async addPreferiti(episodioId, userId) {
          let response = await fetch('/api/preferiti', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(episodioId, userId),
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

      async addAcquistati(episodioId, userId) {
          let response = await fetch('/api/acquistati', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(episodioId, userId),
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

    async deletePreferiti(podcastId, userId) {
        let response = await fetch(`/api/preferiti/${podcastId}/${userId}`, {
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