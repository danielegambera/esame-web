
//crea il nuovo commento

class Commento{

    constructor(id=undefined, titolo, data, descrizione){
        this.id = id;
        //data = new Date();
        this.data = moment.utc(data);
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
        t.data = moment.utc(t.data);
        return t;
    }
}

export default Commento;