'use strict';

function createCommentoForm() {
    return `<main class="col-8 mx-auto below-nav">
    <form role="form" method="POST" action="" id="episodio-form">
      <div id="error-messages"></div>
      <input type="text" name="id" id="form-id" hidden>
      <p>Crea commento</p>          
      <div class="form-group">
        <label class="control-label">Titolo</label>
        <div>
            <input type="text" class="form-control input-lg" name="Titolo" placeholder="Inserisci un titolo al episodio..." id="form-titolo" required>
        </div>
      </div>

        <div class="form-group">
            <label class="descrizione-label">Descrizione Podcast</label>
            <div>
            <textarea class="form-control input-lg" name="descrizione" placeholder="Inserisci descrizione..." id="form-descrizione" rows="3" required></textarea>
            </div>
        </div>

        <div class="form-group">
        <label class="control-label">Data</label>
        <div>
            <input type="date" class="form-control input-lg" name="Data" id="form-date">
        </div>
      </div>

      <div class="form-group">
        <div>
            <button type="submit" class="btn btn-primary">Salva</button>
        </div>
      </div>
    </form>
  </main>`;
}

export default createCommentoForm;