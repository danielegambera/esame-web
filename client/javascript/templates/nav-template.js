'use strict';

function createNavLinks(active) {
  return `<li class="nav-item ${active==='tutti' ? 'active' : ''}">
    <a class="nav-link" href="/">Tutti ${active==='tutti' ? '<span class="sr-only">(current)</span>' : ''}</a>
  </li>
  <li class="nav-item ${active==='seguiti' ? 'active' : ''}">
    <a class="nav-link" href="/seguiti">Seguiti ${active==='seguiti' ? '<span class="sr-only">(current)</span>' : ''}</a>
  </li>
  <li class="nav-item ${active==='preferiti' ? 'active' : ''}">
    <a class="nav-link" href="/preferiti">Preferiti ${active==='preferiti' ? '<span class="sr-only">(current)</span>' : ''}</a>
  </li>
  <li class="nav-item ${active==='acquistati' ? 'active' : ''}">
    <a class="nav-link" href="/acquistati">Acquistati ${active==='acquistati' ? '<span class="sr-only">(current)</span>' : ''}</a>
  </li>
  `;
}

export {createNavLinks};

