
const characters = "https://rickandmortyapi.com/api/character"
const charactersList = document.getElementById('character-list')
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
let currentPage = 1;

function fetchCharacters(page) {
    const charactersUrl = `https://rickandmortyapi.com/api/character?page=${page}`;
    fetch(charactersUrl)
        .then((response) => response.json())
        .then((data) => {
            charactersList.innerHTML = '';

            data.results.forEach((character) => {
                const characterCard = document.createElement('li');
                charactersList.appendChild(characterCard);
                characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <p><strong>Nombre:</strong> ${character.name}</p>
                <p><strong>Especie:</strong> ${character.species}</p>
            `;
            });
            nextPage.disabled = !data.info.next;
            prevPage.disabled = !data.info.prev;
        })
        .catch((error) => {
            charactersList.innerText = "Error al obtener los datos.";
        });
    }


fetchCharacters(currentPage);

nextPage.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
});

prevPage.addEventListener('click', () => {
    currentPage--;
    fetchCharacters(currentPage);
});