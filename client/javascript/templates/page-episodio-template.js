'use strict';

function createEpisodioPage(episodio) {
    return `<div class="jumbotron below-nav">
                        <h1 class="display-4">${episodio.titolo}</h1>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <p>Da: <a href="">${episodio.podcast.id}</a></p>
                            <p>Creatore: ${episodio.podcast.id}</p> 
                            <p>Data: ${episodio.data.format('DD/MM/YYYY')}</p>
                            <p>Sponsor: ${episodio.sponsor}</p>
                            <p>Descrizione: ${episodio.sponsor}</p>
                            <p>Costo: ${episodio.costo} id="costo" invisible
                                <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#paga-modal" invisible>
                                <svg class="bi bi-cart4" width="1em" height="1em" viewBox="0 0 16 16"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                                </button>
                            </p>
                            <button type="button" class="btn btn-warning" id="preferiti">Preferiti</button>

                        </div>
                        <audio controls src="${episodio.audio}" id="audio" invisible></audio>
                        <!--Modifica-->
                            <button type="button" class="btn btn-outline-dark" href="/episodi/${episodio.id}/edit" invisible src="/svg/delete.svg">
                            </button>
                            <!--Elimina-->
                            <button type="button" class="btn btn-outline-dark" href="#" invisible src="/svg/delete.svg"></button>

                    </div>`;
}

function createCommentoTable() {
    return `<table class="table">
        <thead class="thead-light">
            <tr>
                <th>Titolo</th>
                <th>Testo</th>
                <th>Utente</th>
                <th>Data</th>
                <th>
                <!--Aggiungi-->
                        <button type="button" class="btn btn-outline-dark" data-toggle="modal" id="add" href="/addCommento">
                            <svg class="bi bi-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                                <path fill-rule="evenodd"
                                    d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                            </svg>
                        </button>
                </th>
            </tr>
        </thead>
        <tbody id="commenti">
        </tbody>
    </table>`;
}

function createCommentoRow(commento) {
    return `<tr>
        <td>${commento.titolo}</td>
        <td>${commento.testo}</td>
        <td>${commento.user_id}</td>
        <td>${commento.data.format('DD/MM/YYYY')}</td>
        <td>
            <!--Modifica-->
                <button type="button" class="btn btn-outline-dark" href="/commenti/${commento.id}/edit" invisible src="/svg/edit.svg"></button>
            <!--Elimina-->
                <button type="button" class="btn btn-outline-dark" id="elimina" href="#" invisible src="/svg/delete.svg"></button>
        </td>
    </tr>`;
}

export { createEpisodioPage , createCommentoTable, createCommentoRow};