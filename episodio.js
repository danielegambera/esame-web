class Episodio {

    constructor(id, titolo, descrizione, audio, sponsor, prezzo, data, userId) {
        if(id)
            this.id = id;
        this.descrizione = descrizione;
        this.titolo = titolo;
        this.audio = audio;
        this.prezzo = prezzo;
        this.sponsor = sponsor;
        this.data = data;
        this.userId = userId;
    }
}

module.exports = Episodio;