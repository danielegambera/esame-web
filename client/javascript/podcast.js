
//crea il nuovo podcast

class Podcast{

    constructor(id=undefined, titolo, descrizione, categoria, immagine) {
        this.id = id;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.categoria = categoria;
        this.immagine = immagine;

        //data = moment().format("DD/MM/YYYY");
    }

    static form(json){
        const t = Object.assign(new Podcast(), json);
        //t.data = moment.utc(t.data);

        return t;
    }
}

export default Podcast;