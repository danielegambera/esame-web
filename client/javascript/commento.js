
//crea il nuovo commento

class Commento{

    constructor(id=undefined, titolo, descrizione){
        this.id = id;
        data = moment().format("DD/MM/YYYY");
        this.descrizione = descrizione;
        this.titolo = titolo;

    }

    /**
     * Construct an Comment from a plain object
     * @param {*} json 
     * @return {Commento} the newly created Comment object
     */
    static form(json){
        const t = Object.assign(new Commento(), json);
        return t;
    }
}

export default Commento;