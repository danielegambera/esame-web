
function createPodcastTable() {
    return `<table class="table">
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