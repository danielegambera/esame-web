import PodcastManager from './podcast-manager.js';
import EpisodioManager from './episodio-manager.js';
import CommentoManager from './commento-manager.js';
import createPodcastAddForm from './templates/form-podcast-template.js';
import createEpisodioAddForm from './templates/form-episodio-template.js';
import createCommentoAddForm from './templates/form-commento-template.js';
import createAcquistaForm from './templates/form-acquista-template.js';
import Podcast from './podcast.js';
import Episodio from './episodio.js';
import Commento from './commento.js';
import Api from './api.js';
import { createPodcastPage, createEpisodioTable, createEpisodioRow} from './templates/page-podcast-template.js';
import { createEpisodioPage, createCommentoTable, createCommentoRow} from "./templates/page-episodio-template.js"
import { createPodcastTable, createPodcastRow} from './templates/page-tabella-podcast-template.js';
import { createEpisodioTab, createEpisodioRiga} from './templates/page-tabella-episodio-template.js';
import createLoginForm from './templates/login-template.js';
import createSignupForm from './templates/signup-template.js';
import createAlert from './templates/alert-template.js';
import page from '//unpkg.com/page/page.mjs';




class App {
    constructor(appContainer) {
        // reference to the podcast list container
        this.appContainer = appContainer;
        // reference to the user/login area in the navbar
        //this.userContainer = userContainer;
        this.seguitiLink = document.querySelector('#seguiti');
        this.preferitiLink = document.querySelector('#preferiti');
        this.acquistatiLink = document.querySelector('#acquistati');
        this.loginLink = document.querySelector('#login-area');
        this.signupLink = document.querySelector('#signup-area');
        this.logoutLink = document.querySelector('#logout');


        // init the podcast manager
        this.podcastManager = new PodcastManager();
        this.episodioManager = new EpisodioManager();
        this.commentoManager = new CommentoManager();

        // routing
        page('/', () => {
            page('/podcasts');
        });

        //mostra tutti i podcast
        page('/podcasts', () => {
            this.showPodcasts();
        });
        //mostra tutti i podcast seguiti
        page('/seguiti', () => {
            this.showSeguiti();
        });
        //mostra tutti i podcast preferiti
        page('/preferiti', () => {
            this.showPreferiti();
        });
        //mostra tutti i podcast acquistati
        page('/acquistati', () => {
            this.showAcquistati();
        });

        //mostra solo la pagina del podcast
        page('/podcasts/:id', (ctx) => {
            this.showPodcastPage(ctx.params.id);
        });
        //edit del podcast
        page('/podcasts/:id/edit', (ctx) => {
            this.showAddEditPodcastForm(ctx.params.id);
        });
        //aggiunta del podcast
        page('/addPodcast', () => {
            this.showAddEditPodcastForm();
        });

        //mostra solo la pagina del episodio interessato
        page('/episodi/:id', (ctx) => {
            this.showEpisodioPage(ctx.params.id);
        });
        //edit del episodio
        page('/episodi/:id/edit', (ctx) => {
            this.showAddEditEpisodioForm(ctx.params.id);
        });
        //aggiunta episodio
        page('/addEpisodio', () => {
            this.showAddEditEpisodioForm();
        });
        //modifica commento
        page('/commenti/:id/edit', (ctx) => {
            this.showAddEditCommentoForm(ctx.params.id);
        });
        //agginta commento
        page('/addCommento', () => {
            this.showAddEditCommentoForm();
        });
        page('/login', () => {
            //this.userContainer.innerHTML = createLogin();
            this.appContainer.innerHTML = createLoginForm();
            document.getElementById('login-form').addEventListener('submit', this.onLoginSubmitted);
        });
        page('/signup', () => {
            //this.userContainer.innerHTML = createLogin();
            this.appContainer.innerHTML = createSignupForm();
            document.getElementById('signup-form').addEventListener('submit', this.onSignupSubmitted);
        });
        page();
    }

    /**
     * Common functionality for many pages
     *
    init = async () => {
        //this.userContainer.innerHTML = createUser();
        //this.appContainer.innerHTML = createPodcastsPage();

        // get all podcasts
        await this.podcastManager.getAllPodcasts();
        await this.episodioManager.getAllEpisodi();
        await this.commentoManager.getAllCommenti();

    }*/

       onAcquistaFormSubmitted = (event) => {
           event.preventDefault();
           const addForm = document.getElementById('acquista-form');

           const numeroCarta = addForm.elements['form-numero'].value;
           const ccv = addForm.elements['form-ccv'].value;

           if (isNaN(numeroCarta) || isNaN(ccv) /*|| !numeroCarta == /^[0-9]{3,4}$/|| check('ccv').isLength({min: 3, max: 4})*/) {
                    document.getElementById('error-messages').innerHTML = createAlert('danger', "Numeri non nel formato corretto");
           } else {
               //the id is empty -> add
               this.episodioManager.addAcquistati(podcast).then(() => {
                   page('/');
               });
           }
       }

    /**
     * Handling the form submission: edit and add podcast
     * @param {*} event the submission event
     */
    onPodcastFormSubmitted = (event) => {
        event.preventDefault();
        const addForm = document.getElementById('podcast-form');

        const titolo = addForm.elements['form-titolo'].value;
        const categoria = addForm.elements['form-categoria'].value;
        const descrizione = addForm.elements['form-descrizione'].value;
        const immagine = addForm.elements['fileImg'].value;
        
        if(addForm.elements['form-id'].value && addForm.elements['form-id'].value !== ""){
            //sono nel campo update
            //there is a podcast id -> update
            const id = addForm.elements['form-id'].value;
            const podcast = new Podcast(id, titolo, descrizione, categoria, immagine);
            this.podcastManager.updatePodcast(podcast) 
                .then(() => {     
                    //reset the form and go back to the home
                    addForm.reset();
                    page('/');
                })
                .catch((error) => {
                    // add an alert message in DOM
                    document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                    }
                );
        } else {
            //the id is empty -> add
            const podcast = new Podcast(undefined, titolo, descrizione, categoria, immagine);
            
            this.podcastManager.addPodcast(podcast).then(() => {
                page('/');
            });
        }
    }

    /**
     * Handling the form submission: edit and add episodio
     * @param {*} event the submission event
     */
    onEpisodioFormSubmitted = (event) => {
        event.preventDefault();
        const addForm = document.getElementById('episodio-form');

        const titolo = addForm.elements['form-titolo'].value;
        const descrizione = addForm.elements['form-descrizione'].value;
        const prezzo = addForm.elements['form-prezzo'].value;
        const audio = addForm.elements['form-audio'].value;
        const sponsor = addForm.elements['form-sponsor'].value;

        if (addForm.elements['form-id'].value && addForm.elements['form-id'].value !== "") {
            //sono nel campo update
            //there is a podcast id -> update
            const id = addForm.elements['form-id'].value;
            const episodio = new Episodio(id, titolo, descrizione, audio, sponsor, prezzo);
            this.episodioManager.updateEpisodo(episodio)
                .then(() => {
                    //reset the form and go back to the home
                    addForm.reset();
                    page('/');
                })
                .catch((error) => {
                    // add an alert message in DOM
                    document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                });
        } else {
            //the id is empty -> add
            const episodio = new Episodio(undefined, titolo, descrizione, audio, sponsor, prezzo);
            this.episodioManager.addEpisodo(episodio).then(() => {
                page('/');
            });
        }
    }

    /**
     * Handling the form submission: edit and add commneto
     * @param {*} event the submission event
     */
    onCommentoFormSubmitted = (event) => {
        event.preventDefault();

        const addForm = document.getElementById('commento-form');

        const titolo = addForm.elements['form-titolo'].value;
        const descrizione = addForm.elements['form-descrizione'].value;


        if (addForm.elements['form-id'].value && addForm.elements['form-id'].value !== "") {
            //sono nel campo update
            //there is a podcast id -> update
            const id = addForm.elements['form-id'].value;
            const commento = new Commento(id, titolo, descrizione);
            this.commentoManager.updateCommento(commento)
                .then(() => {
                    //reset the form and go back to the home
                    addForm.reset();
                    page('/');
                })
                .catch((error) => {
                    // add an alert message in DOM
                    document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                });
        } else {
            //the id is empty -> add
            const commento = new Commento(undefined, titolo, descrizione);

            this.commentoManager.addCommento(commento).then(() => {
                page('/');
            });
        }
    }

    /**
     * gestisce il form per la reazione o modifica dei podcast
     * @param {*} id the podcast id
     */
    showAddEditPodcastForm = async (id) => {
        // add the form
        this.appContainer.innerHTML = createPodcastAddForm();

        if(id !== undefined) {
            if(this.podcastManager.podcasts.length === 0)
                await this.podcastManager.getAllPodcasts();

            const podcast = this.podcastManager.podcasts[id-1];
            const addForm = document.getElementById('podcast-form');
            addForm.elements['form-id'].value = podcast.id;
            addForm.elements['form-titolo'].value = podcast.titolo;
            addForm.elements['form-categoria'].value = podcast.categoria;
            addForm.elements['form-descrizione'].value = podcast.descrizione;
            addForm.elements['fileImg'].value = podcast.immagine;
        }
        // set up form callback
        document.getElementById('podcast-form').addEventListener('submit', this.onPodcastFormSubmitted);
    }

     showAcquistaForm = async (id) => {
         // add the form
         this.appContainer.innerHTML = createAcquistaForm();

             const addForm = document.getElementById('acquista-form');
             addForm.elements['form-numero'].value;
             addForm.elements['form-ccv'].value;
         // set up form callback
         document.getElementById('acquista-form').addEventListener('submit', this.onAcquistaFormSubmitted);
     }

    showAddEditEpisodioForm = async (id) => {
        // add the form
        this.appContainer.innerHTML = createEpisodioAddForm();

        if (id !== undefined) {
            if (this.episodioManager.episodi.length === 0)
                await this.episodioManager.getAllEpisodi();

            const episodio = this.episodioManager.episodio[id - 1];
            const addForm = document.getElementById('episodio-form');
            addForm.elements['form-id'].value = episodio.id;
            addForm.elements['form-titolo'].value = episodio.titolo;
            addForm.elements['form-descrizione'].value = episodio.descrizione;
            addForm.elements['form-sponsor'].value = episodio.sponsor;
            addForm.elements['form-prezzo'].value = episodio.prezzo;
        }
        // set up form callback
        document.getElementById('episodio-form').addEventListener('submit', this.onEpisodioFormSubmitted);
    }

    showAddEditCommentoForm = async (id) => {
        // add the form
        this.appContainer.innerHTML = createCommentoAddForm();

        if (id !== undefined) {
            if (this.commentoManager.commenti.length === 0)
                await this.commentoManager.getAllCommenti();

            const commento = this.commentoManager.commenti[id - 1];
            const addForm = document.getElementById('commento-form');
            addForm.elements['form-id'].value = commento.id;
            addForm.elements['form-titolo'].value = commento.titolo;
            addForm.elements['form-descrizione'].value = commento.descrizione;
        }
        // set up form callback
        document.getElementById('commento-form').addEventListener('submit', this.onCommentoFormSubmitted);
    }

       /**
        * Show all podcast
        * @param {*} path the current path (URL)
        *
       showAllPodcasts = async (path) => {
           try {
               await this.init();
               this.showPodcasts(path);
           } catch (err) {
               page('/login');
           }
       }*/

    /**
     * Create the HTML table for showing the podcast
     */
    showPodcasts = async () => {
        try {
            const podcasts = await this.podcastManager.getAllPodcasts();
            this.appContainer.innerHTML = createPodcastTable();
            const podcastTable = document.querySelector('#podcast-list');
            for (let podcast of podcasts) {
                const podcastRow = createPodcastRow(podcast);
                podcastTable.insertAdjacentHTML('beforeend', podcastRow);
            }
        } catch (error) {
            console.log(error);
            page.redirect('/login');
        }
    }

    /**
     * Create the HTML table for showing the podcast
     */
    showSeguiti = async () => {
        try {

            const user = localStorage.getItem('user');
            const podcasts = await this.podcastManager.getAllSeguiti(user.id);
            this.appContainer.innerHTML = createPodcastTable();
            const podcastTable = document.querySelector('#podcast-list');

            for (let podcast of podcasts) {
                const podcastRow = createPodcastRow(podcast);
                podcastTable.insertAdjacentHTML('beforeend', podcastRow);
            }
        } catch (error) {
            console.log(error);
            page.redirect('/login');
        }
    }

    /**
     * Create the HTML table for showing the podcast
     */
    showPreferiti = async () => {
        try {
            const user = localStorage.getItem('user');            
            const podcasts = await this.episodioManager.getAllPreferiti(user.id);
            this.appContainer.innerHTML = createPodcastTable();
            const podcastTable = document.querySelector('#podcast-list');

            for (let podcast of podcasts) {
                const podcastRow = createPodcastRow(podcast);
                podcastTable.insertAdjacentHTML('beforeend', podcastRow);
            }
        } catch (error) {
            page.redirect('/login');
        }
    }

    /**
     * Create the HTML table for showing the podcast
     */
    showAcquistati = async () => {
        try {
            const user = localStorage.getItem('user');
            const episodi = await this.episodioManager.getAllAcquistati(user.id);
            this.appContainer.innerHTML = createEpisodioTab();
            const podcastTable = document.querySelector('#episodio-list');

            for (let episodio of episodi) {
                const podcastRow = createPodcastRiga(episodio);
                podcastTable.insertAdjacentHTML('beforeend', podcastRow);
            }
        } catch (error) {
            page.redirect('/login');
        }
    }

    showPodcastPage = async (id) => {
        try {
            const podcast = await this.podcastManager.getPodcastId(id);
            const episodi = await this.episodioManager.getAllEpisodi();
            const seguiti = await this.podcastManager.getAllSeguiti();
            const user = localStorage.getItem('user');
            var flag = false;

            for(let seguito of seguiti)
            {
                if (user.id == seguito.user_id && id == seguito.podcast_id) 
                {
                    flag = true;
                }
            }

            this.appContainer.innerHTML = createPodcastPage(podcast);

            var elimina = document.getElementById(elimina);
            var segui = document.getElementById(segui);
            var modifica = document.getElementById(modifica);

            if(user.id == podcast.user_id)
            {
                modifica.remove("invisible");
                elimina.remove("invisible");
            }

            this.appContainer.innerHTML = createEpisodioTable();
            const episodioTabella = document.querySelector('#episodio');

            for (let episodio of episodi) {
                const epiosodioRow = createEpisodioRow(episodio);
                episodioTabella.insertAdjacentHTML('beforeend', epiosodioRow);
            }

             // callback to delete a podcast
             elimina.addEventListener('click', () => {
                 this.podcastManager.deletePodcast(podcast.id)
                     .catch((error) => {
                         // add an alert message in DOM
                         document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                     });
             });

              // callback to seguire a podcast
              segui.addEventListener('click', () => {
                  //aggiungere un controllo per i seguiti
                  if(flag == false){
                      this.podcastManager.addSegui(podcast.id, user.id)
                      .catch((error) => {
                          // add an alert message in DOM
                          document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                      });
                  }
                  else
                  {
                     this.podcastManager.deleteSeguiti(podcast.id, user.id)
                         .catch((error) => {
                             // add an alert message in DOM
                             document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                         });
                  }
              });

        } catch (error) {
            console.log(error);
            page.redirect('/login');
        }
    }

    showEpisodioPage = async (id) => {
        try {
            const commenti = await this.commentoManager.getAllCommenti();
            const episodio = await this.episodioManager.getEpisodioId(id);
            const acquistati = await this.episodioManager.getAllAcquistati();
            const preferiti = await this.episodioManager.getAllPreferiti();
            const user = localStorage.getItem('user');

            //flag e controlli per vedere se l'episodio è stato comprato o è un preferito
             var flagbuy = false;
             var flagPref = false;

             for (let acquistato of acquistati) {
                 if (user.id == acquistato.user_id && id == acquistato.podcast_id) {
                     flagbuy = true;
                 }
             }

             for (let preferito of preferiti) {
                 if (user.id == preferito.user_id && id == preferito.podcast_id) {
                     flagPref = true;
                 }
             }

            this.appContainer.innerHTML = createEpisodioPage(episodio);

            var modificaEp = document.getElementById(modificaEp);
            var eliminaEp = document.getElementById(eliminaEp);
            var modificaCom = document.getElementById(modificaCom);
            var eliminaCom = document.getElementById(eliminaCom);
            var costo = document.getElementById(costo);
            var audio = document.getElementById(audio);

            if (user.id == episodio.user_id) {
                modificaEp.remove("invisible");
                eliminaEp.remove("invisible");
            }

            if (flagbuy || episodio.costo == 0) {
                audio.remove("invisible");
                costo.add("invisible");
            }

            this.appContainer.innerHTML = createCommentoTable();
            const commentoTabella = document.querySelector('#commento');

            for (let commento of commenti) {
                const commentoRow = createCommentoRow(commento);
                if (user.id == commento.user_id) {
                    modificaCom.remove("invisible");
                    eliminaCom.remove("invisible");
                    var idComm = commento.id;
                }
                commentoTabella.insertAdjacentHTML('beforeend', commentoRow);
            }

            // callback to delete a podcast
            eliminaEp.addEventListener('click', () => {
                this.episodioManager.deleteEpisodo(episodio.id)
                    .catch((error) => {
                        // add an alert message in DOM
                        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                    });
            });

            // callback to delete a podcast
            eliminaCom.addEventListener('click', () => {
                this.commentoManager.deleteCommento(commento.id)
                    .catch((error) => {
                        // add an alert message in DOM
                        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                    });
            });

            // callback to seguire a podcast
            preferiti.addEventListener('click', () => {
                //aggiungere un controllo per i seguiti
                if (flagPref == false) {
                    this.episodioManager.addPreferiti(idComm, user.id)
                        .catch((error) => {
                            // add an alert message in DOM
                            document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                        });
                } else {
                    this.episodioManager.deletePreferiti(idComm, user.id)
                        .catch((error) => {
                            // add an alert message in DOM
                            document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                        });
                }
            });

        } catch (error) {
            page.redirect('/login');
        }
    }

    /**
     * Event listener for the submission of the login form. Handle the login.
     * @param {*} event 
     */
    onLoginSubmitted = async (event) => {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('error-messages');

        if (form.checkValidity()) {
            try {
                const user = await Api.doLogin(form.email.value, form.password.value);
                this.logoutLink.classList.remove('invisible');
                this.loginLink.classList.add('invisible');
                this.signupLink.classList.add('invisible');
                localStorage.setItem('user', user);
                page.redirect('/');
            } catch (error) {
                console.log(error);
                if (error) {
                    const errorMsg = error;
                    // add an alert message in DOM
                    alertMessage.innerHTML = createAlert('danger', errorMsg);
                    // automatically remove the flash message after 3 sec
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    }, 3000);
                }
            }
        }
    }

    /**
     * Event listener for the submission of the signup form. Handle the signup.
     * @param {*} event 
     */
    onSignupSubmitted = async (event) => {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('error-messages');

        if (form.checkValidity()) {
            try {
                await Api.doSignup(form.nome.value, form.email.value, form.password.value, form.creatore.checked);
                page.redirect('/login');
            } catch (error) {
                console.log(error);
                if (error) {
                    const errorMsg = error;
                    // add an alert message in DOM
                    alertMessage.innerHTML = createAlert('danger', errorMsg);
                    // automatically remove the flash message after 3 sec
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    }, 3000);
                }
            }
        }
    }

    /**
     * Render the navbar and show the logout link
     *
    renderNavBar = (active) => {
        this.navLinks.innerHTML = '';
        this.navLinks.insertAdjacentHTML('beforeend', createNavLinks(active));
        this.logoutLink.classList.remove('invisible');
    };
*/

    /**
     * Perform the logout
     */
    logout = async () => {
        await Api.doLogout();
        this.logoutLink.classList.add('invisible');
        page.redirect('/podcast');
    }

}

export default App;