
function createEpisodioTable() {
    return `
    <p>Episodi</p>
    <table class="table">
        <thead class="thead-light">
            <tr>
                <th>Titolo</th>
            </tr>
        </thead>
        <tbody id="episodio-list">
        </tbody>
    </table>`;
}

function createEpisodioRow(episodio) {
    return `<tr>
        <td><a href="/podcast/${episodio.id}">${episodio.titolo}</a></td>
    </tr>`;
}

export {
    createEpisodioRow,
    createEpisodioTable
};