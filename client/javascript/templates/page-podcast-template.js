'use strict';

function createPodcastPage(podcast) {
    return `<div class="jumbotron">
                        <h1 class="display-4">${podcast.titolo}</h1>
                    </div>
                    <div class="media">
                        <img src="${podcast.immagine}" class="mr-3 immEpisodio" alt="...">
                        <div class="media-body">
                            <p>Creatore: ${podcast.user_id}</p>
                        <p>Categoria: ${podcast.categoria}</p>
                        
                        <button type="button" class="btn btn-warning" id="segui" invisible>Segui</button>

                        <!--Modifica-->
                        <button type="button" class="btn btn-outline-dark" href="/podcasts/${podcast.id}/edit" invisible src="/svg/edit.svg"></button>
                            <!--Elimina-->
                            <button type="button" class="btn btn-outline-dark" id="elimina" href="#" invisible src="/svg/delete.svg"></button>
                        <!--Aggiungi-->
                        <button type="button" class="btn btn-outline-dark" data-toggle="modal" id="add" href="/addEpisodio">
                            <svg class="bi bi-plus" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                                <path fill-rule="evenodd"
                                    d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                            </svg>
                        </button>
                        </div>
                        
                    </div>
                    
                    <p>${podcast.descrizione}</p>`;
}

function createEpisodioTable() {
    return `<table class="table">
        <thead class="thead-light">
            <tr>
                <th>Titolo</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody id="episodio">
        </tbody>
    </table>`;
}

function createEpisodioRow(episodio) {
    return `<tr>
        <td><a href="/episodi/${episodio.id}">${episodio.titolo}</a></td>
        <td>${episodio.data}</td>
    </tr>`;
}

export { createPodcastPage , createEpisodioTable, createEpisodioRow};