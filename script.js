const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'http://ergast.com/api/f1/seasons';

// Search by seasons
async function searchSeason(seasons) {
  const res = await fetch(apiURL);
  const data = await res.json();

  showData(data);
}

// Show in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          season => `<li>
      <span><strong>${seasons}</strong> - ${circuits}</span>
      <button class="btn" data-artist="${seasons}" data-songtitle="${circuits}">Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
}

// Get prev and next 
async function getMoreSeasons(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Get lyrics for song

// async function getLyrics(artist, songTitle) {
//   const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
//   const data = await res.json();

//    if (data.error) {
//         result.innerHTML = data.error;
//    } else {
//         const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

//         result.innerHTML = `
//             <h2><strong>${artist}</strong> - ${songTitle}</h2>
//             <span>${lyrics}</span>
//         `;
//   }

//   more.innerHTML = '';
// }

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchSeasons = search.value.trim();

  if (!searchSeasons) {
    alert('Please type in a search ');
//   } else {
//     search(searchSeasons);
  }
});

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const seasons = clickedEl.getAttribute('data-seasons');
    // const songTitle = clickedEl.getAttribute('data-songtitle');

    getMoreSeasons(seasons);
  }
});
