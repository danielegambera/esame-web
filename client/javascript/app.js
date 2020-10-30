import PodcastManager from './podcast-manager.js';
import EpisodioManager from './episodio-manager.js';
import CommentoManager from './commento-manager.js';
import createPodcastAddForm from './templates/form-podcast-template.js';
import createEpisodioAddForm from './templates/form-episodio-template.js';
import createCommentoAddForm from './templates/form-commento-template.js';
//import createPodcastsPage from './templates/podcast-list-template.js';
import Podcast from './podcast.js';
import Episodio from './episodio.js';
import Commento from './commento.js';
import Api from './api.js';
import createLoginForm from './templates/login-template.js';
import createSignupForm from './templates/signup-template.js';
import createAlert from './templates/alert-template.js';
import {createNavLinks} from './templates/nav-template.js';
import page from '//unpkg.com/page/page.mjs';
import { createEpisodioRow, createEpisodioTable, createPodcastPage } from './templates/page-podcast-template.js';
import { getPodcast } from '../../podcast-dao.js';

class App {
    constructor(appContainer, userContainer) {
        // reference to the podcast list container
        this.appContainer = appContainer;
        // reference to the user/login area in the navbar
        this.userContainer = userContainer;
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
        page('/podcasts', this.showPodcasts);
        //mostra tutti i podcast seguiti
        page('/seguiti', this.showSeguiti);
        //mostra tutti i podcast preferiti
        page('/preferiti', this.showPreferiti);
        //mostra tutti i podcast acquistati
        page('/acquistati', this.showAcquistati);
        //mostra tutti i podcast personali
        page('/personali', this.showPersonali);

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
     */
    init = async () => {
        //this.userContainer.innerHTML = createUser();
        //this.appContainer.innerHTML = createPodcastsPage();

        // get all podcasts
        await this.podcastManager.getAllPodcasts();
        await this.episodioManager.getAllEpisodi();
        await this.commentoManager.getAllCommenti();

    }

    /**
     * Handling the form submission: edit and add podcast
     * @param {*} event the submission event
     */
    onPodcastFormSubmitted = (event) => {
        event.preventDefault();
        const addForm = document.getElementById('podcast-form');

        const titolo = addForm.elements['form-titolo'].value;
        
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
        //const audio = addForm.elements['form-audio'].value;
        const sponsor = addForm.elements['form-sponsor'].value;

        if (addForm.elements['form-id'].value && addForm.elements['form-id'].value !== "") {
            //sono nel campo update
            //there is a podcast id -> update
            const id = addForm.elements['form-id'].value;
            const episodio = new Episodio(id, titolo, descrizione, undefined, sponsor, prezzo);
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
            const episodio = new Episodio(undefined, titolo, descrizione, undefined, sponsor, prezzo);
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
     * Create the HTML table for showing the podcast
     */
    showPodcasts = async () => {
        try {
            const podcasts = getAllPodcasts();

            this.renderNavBar('tutti');

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
    showSeguiti = async () => {
        try {
            const podcasts = getAllSeguiti();

            this.renderNavBar('seguiti');

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
    showPreferiti = async () => {
        try {
            const podcasts = getAllPreferiti();

            this.renderNavBar('preferiti');

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
            const podcasts = getAllAcquistati();

            this.renderNavBar('acquistati');

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
    showPersonali = async () => {
        try {
            const podcasts = getAllPersonali();

            this.renderNavBar('personali');

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

    showPodcastPage = async (id, userId) => {
        try {
            //come prendo il podcast dato id????
            const podcast = getPodcast(id, userId);
            const episodi = getAllPersonali();

            this.appContainer.innerHTML = createPodcastPage(podcast);

            var elimina = document.getElementById(elimina);
            var segui = document.getElementById(segui);

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
                  this.podcastManager.addSegui(podcast.id, userId)
                      .catch((error) => {
                          // add an alert message in DOM
                          document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                      });
              });

        } catch (error) {
            page.redirect('/login');
        }
    }

    showEpisodioPage = async () => {
        try {
            //come prendo il podcast dato id????
            const commenti = getAllPersonali();
            const episodi = getAllPersonali();

            this.appContainer.innerHTML = createEpisodioPage(episodio);

            this.appContainer.innerHTML = createCommentoTable();
            const commentoTabella = document.querySelector('#commento');

            for (let commento of commenti) {
                const commentoRow = createCommentoRow(commento);
                commentoTabella.insertAdjacentHTML('beforeend', commentoRow);
            }
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
                await Api.doSignup(form.nome.value, form.email.value, form.password.value);
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
     */
    renderNavBar = (active) => {
        this.navLinks.innerHTML = '';
        this.navLinks.insertAdjacentHTML('beforeend', createNavLinks(active));
        this.logoutLink.classList.remove('invisible');
    };

    /**
     * Perform the logout
     */
    logout = async () => {
        await Api.doLogout();
        this.logoutLink.classList.add('invisible');
        page.redirect('/');
    }

}

export default App;