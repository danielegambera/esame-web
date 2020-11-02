
//crea il nuovo podcast

class Podcast{

    constructor(id=undefined, titolo, descrizione, categoria, immagine) {
        this.id = id;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.categoria = categoria;
        this.immagine = immagine;
    }

    static form(json){
        const t = Object.assign(new Podcast(), json);
        return t;
    }
}

export default Podcast;