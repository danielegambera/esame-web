
//crea il nuovo episodio

class Episodio {
    
    constructor(id=undefined, titolo, descrizione, audio, sponsor, data, prezzo) {
        this.id = id;
        this.descrizione = descrizione;
        this.titolo = titolo;
        this.audio = audio;
        this.data = moment.utc(data);
        //data = moment().format("DD/MM/YYYY");
        this.prezzo = prezzo;
        this.sponsor = sponsor;
        this.data = moment.utc(data);

    }

    static form(json) {
        const t = Object.assign(new Episodio(), json);
        t.data = moment.utc(t.data);
        return t;
    }
}

export default Episodio;