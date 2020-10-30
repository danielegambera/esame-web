//commento esistente
class Commento {

    constructor(id, titolo, testo, data, userId) {
        if (id)
            this.id = id;
        this.data = data;
        this.testo = testo;
        this.titolo = titolo;
        this.userId = userId;

    }
}

module.exports = Commento;