'use strict';

function createPodcastForm() {
    return`<main class="col-8 mx-auto below-nav">
    <form role="form" method="POST" action="" id="podcast-form">
      <div id="error-messages"></div>
      <input type="text" name="id" id="form-id" hidden>
      <p>Crea podcast</p>          
      <div class="form-group">
        <label class="control-label">Titolo</label>
        <div>
            <input type="text" class="form-control input-lg" name="Titolo" placeholder="Inserisci un titolo al podcadst..." id="form-titolo" required>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">Categoria</label>
        <div>
            <input type="text" class="form-control input-lg" name="Categoria" placeholder="Inserisci una categoria per il podcast..." id="form-categoria">
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
        <input class="file-label">File immagine</input>
          <input type="file" class="form-control-file" id="fileImg">
      </div>

      <div class="form-group">
        <div>
            <button type="submit" class="btn btn-primary">Salva</button>
        </div>
      </div>
    </form>
  </main>`;
}

export default createPodcastForm;