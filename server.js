// imports
const express = require('express');
const morgan = require('morgan');
const {check, validationResult} = require('express-validator'); // validation middleware
const daoUser = require('./user-dao');
const daoPodcast = require('./podcast-dao');
const daoEpisodio = require('./episodio-dao');
const daoCommento = require('./commento-dao');
const Podcast = require('./podcast');
const Episodio = require('./episodio');
const Commento = require('./commento');
const path = require('path');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session');

// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
    function(username, password, done) {
      daoUser.getUser(username, password).then(({user, check}) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!check) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
    }
  ));
  

//serializza gli user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//deserializza gli user
 passport.deserializeUser(function(id, done) {
    daoUser.getUserById(id).then(user => {
      done(null, user);
    });
  });

//init
const app = express();
const port = 3000;

 //set up middleware
 app.use(morgan("tiny"));

 //controllo login
 const isLoggedIn = (req, res, next) => {
     if(req.isAuthenticated()){
         return next();
     }
     return res.status(401).json({"statusCode" : 401, "message" : "non autenticato"});
 }

 //usare i file json
 app.use(express.json());

 //preparare il client
 app.use(express.static("client"));

//preparare la sessione
app.use(session({
    secret: "a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie",
    resave: false,
    saveUninitialized: false
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());


// === REST API endpoints ===/

// GET /podcasts
app.get('/api/podcasts', isLoggedIn, (res) => {
    daoPodcast.getAllPodcast()
        .then((podcasts) => res.json(podcasts) )
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
             });
       });
});

// GET /preferiti
app.get('/api/preferiti', isLoggedIn, (res) => {
    daoEpisodio.getPreferiti(req.user.id)
        .then((episodi) => res.json(episodi))
        .catch((err) => {
            res.status(500).json({
                errors: [{
                    'msg': err
                }],
            });
        });
});

// GET /acquistati
app.get('/api/acquistati', isLoggedIn, (res) => {
    daoEpisodio.getAcquistati(req.user.id)
        .then((episodi) => res.json(episodi))
        .catch((err) => {
            res.status(500).json({
                errors: [{
                    'msg': err
                }],
            });
        });
});

// GET /seguiti
app.get('/api/seguiti', isLoggedIn, (res) => {
    daoPodcast.getSeguiti(req.user.id)
        .then((podcasts) => res.json(podcasts))
        .catch((err) => {
            res.status(500).json({
                errors: [{
                    'msg': err
                }],
            });
        });
});

// GET /podcasts/<podcastId>
app.get('/api/podcasts/:podcastId', isLoggedIn, (req, res) => {
    daoPodcast.getPodcast(req.params.podcastId, req.user.id)
        .then((podcast) => {
            if(podcast.error){
                res.status(404).json(podcast);
            } else {
                res.json(podcast);
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            });
        });
});

// POST /podcasts
app.post('/api/podcasts', isLoggedIn, [
    check('titolo').notEmpty(),
    check('categoria').notEmpty(),
    check('descrizione').notEmpty(),
    check('immagine').notEmpty(),
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const podcast = req.body;
    podcast.userId = req.user.id;
    daoPodcast.addPodcast(podcast)
        .then((id) => res.status(201).header('Location', `/podcasts/${id}`).end())
        .catch((err) => res.status(503).json({ error: err }));
    
});

// POST /episodi
app.post('/api/episodi', isLoggedIn, [
    check('titolo').notEmpty(),
    check('descrizione').notEmpty(),
    check('prezo').notEmpty(),
    check('prezzo').isInt({min:0}),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const episodio = req.body;
    episodio.userId = req.user.id;
    daoEpisodio.addEpisodio(episodio)
        .then((id) => res.status(201).header('Location', `/episodi/${id}`).end())
        .catch((err) => res.status(503).json({
            error: err
        }));

});

// POST /commenti
app.post('/api/commenti', isLoggedIn, [
    check('titolo').notEmpty(),
    check('descrizione').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const commento = req.body;
    commento.userId = req.user.id;
    daoCommento.addCommento(commento)
        .then((id) => res.status(201).header('Location', `/commenti/${id}`).end())
        .catch((err) => res.status(503).json({
            error: err
        }));

});

// PUT /podcasts/<podcastId>
app.put('/api/podcasts/:podcastId', isLoggedIn, [
    check('titolo').notEmpty(),
    check('categoria').notEmpty(),
    check('descrizione').notEmpty(),
    check('immagine').notEmpty(),
  ], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const podcast = req.body;
    podcast.userId = req.user.id;
    daoPodcast.updatePodcast(req.params.podcastId, podcast)
        .then((result) => {
            if(result)
                res.status(404).json(result);
            else
                res.status(200).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});

// PUT /episodi/<episodioId>
app.put('/api/episodi/:episodioId', isLoggedIn, [
    check('titolo').notEmpty(),
    check('descrizione').notEmpty(),
    check('prezo').notEmpty(),
    check('prezzo').isInt({min:0}),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const episodio = req.body;
    episodio.userId = req.user.id;
    daoEpisodio.updateEpisodio(req.params.episodioId, episodio)
        .then((result) => {
            if (result)
                res.status(404).json(result);
            else
                res.status(200).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{
                'param': 'Server',
                'msg': err
            }],
        }));
});

// PUT /commenti/<commentiId>
app.put('/api/commenti/:commentiId', isLoggedIn, [
    check('titolo').notEmpty(),
    check('descrizione').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const commento = req.body;
    commento.userId = req.user.id;
    daoCommento.updateCommento(req.params.commentoId, commento)
        .then((result) => {
            if (result)
                res.status(404).json(result);
            else
                res.status(200).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{
                'param': 'Server',
                'msg': err
            }],
        }));
});

// DELETE /podcasts/<podcastId>
app.delete('/api/podcasts/:podcastId', isLoggedIn, (req,res) => {
    daoPodcast.deletePodcast(req.params.podcastId, req.user.id)
        .then((result) =>  {
            if(result)
                res.status(404).json(result);
            else
             res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
});

// DELETE /episodi/<episodioId>
app.delete('/api/episodi/:episodiId', isLoggedIn, (req, res) => {
    daoEpisodio.deleteEpisodio(req.params.episodioId, req.user.id)
        .then((result) => {
            if (result)
                res.status(404).json(result);
            else
                res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{
                'param': 'Server',
                'msg': err
            }],
        }));
});

// DELETE /commenti/<commentoId>
app.delete('/api/commenti/:commentoId', isLoggedIn, (req, res) => {
    daoCommento.deleteCommento(req.params.commentoId, req.user.id)
        .then((result) => {
            if (result)
                res.status(404).json(result);
            else
                res.status(204).end();
        })
        .catch((err) => res.status(500).json({
            errors: [{
                'param': 'Server',
                'msg': err
            }],
        }));
});

// POST /users
// Sign up
app.post('/api/users', /*[check("nome").notEmpty, check("email").notEmpty, check("password").notEmpty],*/ (req, res) => {
    // create a user object from the signup form
    // additional fields may be useful (name, role, etc.)
    const user = {
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        creatore: req.body.creatore,
    };

    daoUser.createUser(user)
        .then((result) => res.status(201).header('Location', `/users/${result}`).end())
        .catch((err) => res.status(503).json({
            error: 'Database error during the signup'
        }));
});

// POST /sessions 
// Login
app.post('/api/sessions', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            // req.user contains the authenticated user
            return res.json(req.user.username);
        });
    })(req, res, next);
});


// DELETE /sessions/current 
// Logout
app.delete('/api/sessions/current', function (req, res) {
    req.logout();
    res.end();
});

// All the other requests will be served by our client-side app
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'client/index.html'));
  });


 //start server
 app.listen(port, ()=> console.log("Il server è in ascolto sulla porta: "+ port));