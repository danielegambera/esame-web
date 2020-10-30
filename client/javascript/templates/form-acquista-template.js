'use strict';

function createLoginForm() {
    return `<form method="POST" action="" id="buy-form" class="col-6 mx-auto below-nav">
    <div id="error-messages"></div>

    <p>Acquista</p>
    
    <div class="form-group">
        <label class="control-label">Numero carta di credito</label>
         <div>
            <input type="text" class="form-control input-lg" name="numeroCarta" placeholder="Inserisci numero carta..." id="form-numero" required>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label">CCV</label>
        <div>
            <input type="text" class="form-control input-lg" name="CCV" placeholder="Inserisci CCV..." id="form-ccv" required>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Paga</button>
  </form>`;
}

export default createLoginForm;