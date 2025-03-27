const tipoColores = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

async function obtenerDatosPokemon(nombre) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const datos = await respuesta.json();
        
        const contenedorPokemon = document.createElement('div');
        contenedorPokemon.className = 'datos-pokemon';

        const nombrePokemon = document.createElement('p');
        nombrePokemon.textContent = datos.name.toUpperCase();
        contenedorPokemon.appendChild(nombrePokemon);

        const tiposPokemon = document.createElement('p');
        tiposPokemon.textContent = datos.types.map(tipo => tipo.type.name).join(', ').toUpperCase();
        contenedorPokemon.appendChild(tiposPokemon);

        const imagenPokemon = document.createElement('img');
        imagenPokemon.src = datos.sprites.front_default;
        imagenPokemon.alt = datos.name;
        contenedorPokemon.appendChild(imagenPokemon);

        const tipos = datos.types.map(tipo => tipo.type.name);
        if (tipos.length === 1) {
            nombrePokemon.style.color = tipoColores[tipos[0]];
            tiposPokemon.style.color = tipoColores[tipos[0]];
            contenedorPokemon.style.border = `2px solid ${tipoColores[tipos[0]]}`;
            contenedorPokemon.style.backgroundColor = `${tipoColores[tipos[0]]}33`;
        } else {
            nombrePokemon.style.background = `linear-gradient(105deg, ${tipoColores[tipos[0]]} 20%, ${tipoColores[tipos[1]]} 80%)`;
            nombrePokemon.style.webkitBackgroundClip = 'text';
            nombrePokemon.style.webkitTextFillColor = 'transparent';
            nombrePokemon.style.backgroundClip = 'text';
            nombrePokemon.style.textFillColor = 'transparent';
            tiposPokemon.style.background = `linear-gradient(105deg, ${tipoColores[tipos[0]]} 20%, ${tipoColores[tipos[1]]} 80%)`;
            tiposPokemon.style.webkitBackgroundClip = 'text';
            tiposPokemon.style.webkitTextFillColor = 'transparent';
            tiposPokemon.style.backgroundClip = 'text';
            tiposPokemon.style.textFillColor = 'transparent';
            contenedorPokemon.style.border = `linear-gradient(105deg, ${tipoColores[tipos[0]]}33 20%, ${tipoColores[tipos[1]]}33 80%)`;
            contenedorPokemon.style.border = `2px solid ${tipoColores[tipos[0]]}`;
            contenedorPokemon.style.background = `linear-gradient(105deg, ${tipoColores[tipos[0]]}33 20%, ${tipoColores[tipos[1]]}33 80%)`;
        }

        const general = document.getElementById('general');
        if (general.children.length >= 12) {
            general.removeChild(general.lastChild);
        }
        general.insertBefore(contenedorPokemon, general.firstChild);
    } catch (error) {
        console.error('Error al obtener los datos del Pokémon', error);
    }
}

function obtenerPokemonAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 898) + 1;
    obtenerDatosPokemon(idAleatorio);
}

document.getElementById('boton-pokemon-aleatorio').addEventListener('click', obtenerPokemonAleatorio);

for (let i = 1; i <= 12; i++) {
    obtenerPokemonAleatorio();
}