class Podcast{

    constructor(id, titolo, descrizione, categoria, immagine, userId) {
        if(id)
            this.id = id;

        this.titolo = titolo;
        this.descrizione = descrizione;
        this.categoria = categoria;
        this.immagine = immagine;
        this.userId = userId;
    }
}

module.exports = Podcast;