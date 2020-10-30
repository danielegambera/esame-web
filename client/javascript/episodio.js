
//crea il nuovo episodio

class Episodio {
    
    constructor(id=undefined, titolo, descrizione, audio, sponsor, prezzo) {
        this.id = id;
        this.descrizione = descrizione;
        this.titolo = titolo;
        this.audio = audio;
        data = moment().format("DD/MM/YYYY");
        this.prezzo = prezzo;
        this.sponsor = sponsor;
    }

    static form(json) {
        const t = Object.assign(new Episodio(), json);
        return t;
    }
}

export default Episodio;