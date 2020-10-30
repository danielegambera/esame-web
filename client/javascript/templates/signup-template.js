'use strict';

function createSignUpForm() {
    return`<form method="POST" action="" id="signup-form" class="col-6 mx-auto below-nav">
    <div id="error-messages"></div>

    <p>Signup</p>

    <div class="form-group">
      <label for="nome">Nome</label>
      <input type="nome" name="nome" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="email">Indirizzo mail</label>
      <input type="email" name="email" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" class="form-control" required autocomplete/>
    </div>

    <div class="form-group">
          <div>
            <label for="form-creatore" class="control-label">Creatore</label>
            <input type="checkbox" name="form-creatore" id="form-creatore"/>          
          </div>
    </div>

    <button type="submit" class="btn btn-primary">SignUp</button>
  </form>`;
}

export default createSignUpForm;