import Commento from "./commento.js";
//import { json } from "express";


class CommentoManager {
    constructor(){
        this.commenti =[];
    }

    //prendi tutti i commenti
    async getAllCommenti(){
        let response = await fetch('/api/commenti');
        const commentiJson = await response.json();
        if (response.ok) {
            this.commenti = commentiJson.map((ex)=> Commento.form(ex));
            return this.commenti;
        } else{
            throw commentiJson;
        }
    }

    //aggiungi commento
    async addCommento(commento){
        let response =await fetch('/api/commenti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commento),
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

    //update commento
    async updateCommento(commento){
        let response = await fetch(`/api/commenti/${commento.id}`, {
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

    //cancella commento
    async deleteCommento(commentoId) {
        let response = await fetch(`/api/commenti/${commentoId}`, {
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

export default CommentoManager;