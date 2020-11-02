
function createPodcastTable() {
    return `
    <p>Podcast</p>
    <!-- Add a new podcast... -->
    <a type="button" href="/addPodcast" id="add-button" class="btn btn-lg btn-success fixed-right-bottom">&#43;</a>
    <table class="table">
        <thead class="thead-light">
            <tr>
                <th>Titolo</th>
            </tr>
        </thead>
        <tbody id="podcast-list">
        </tbody>
    </table>`;
}

function createPodcastRow(podcast) {
    return `<tr>
        <td><a href="/podcast/${podcast.id}">${podcast.titolo}</a></td>
    </tr>`;
}

export {
    createPodcastTable,
    createPodcastRow
};