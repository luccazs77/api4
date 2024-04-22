const getPokemonUrl= id => `https://pokeapi.co/api/v2/pokemon/${id}`

console.log(getPokemonUrl)


const generatePokemonPromises = () => Array(403).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1 )).then(response => response.json()))

const generateHTML= pokemons => pokemons.reduce((accumulator, {name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

        accumulator += `
            <button class="card ${elementTypes[0]}">
              
              <h1 class="card-title">${id}</h1>  
              <h2 class="card-title1"> ${name} </h2>
                <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
                <p class"card-subtitle">${elementTypes.join(' | ')}</p>
            </button>
            `
            return accumulator

        }, '')

        const inserirPokemons = pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]') //pegando pelo atributo
            ul.innerHTML = pokemons  // retorna o conteúdo HTML
        }

        const filterPokemons = (pokemons, type) => {
            return pokemons.filter(pokemon => pokemon.types.some(typeInfo => typeInfo.type.name === type));
        };

        fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then(data => {
                const types = data.results.map(type => type.name);

                const tipoButton = document.querySelector('[data-js="type-buttons"]');
                types.forEach(type => {
                    if (type !== 'unknown' && type !== 'shadow') { 
                        const button = document.createElement('button');
                        
                        switch (type) {
                            case 'fighting':
                                button.textContent = 'Lutador';
                                break;
                            case 'rock':
                                button.textContent = 'Pedra';
                                break;
                            case 'flying':
                                button.textContent = 'Voador';
                                break;
                            case 'poison':
                                button.textContent = 'Venenoso';
                                break;
                            case 'ground':
                                button.textContent = 'Terrestre';
                                break;
                            case 'bug':
                                button.textContent = 'Inseto';
                                break; 
                            case 'ghost':
                                button.textContent = 'Fantasma';
                                break;
                            case 'steel':
                                button.textContent = 'Metal';
                                break;
                            case 'fire':
                                button.textContent = 'Fogo';
                                break;   
                            case 'water':
                                button.textContent = 'Agua';
                                break;
                            case 'grass':
                                button.textContent = 'Grama';
                                break;
                            case 'electric':
                                button.textContent = 'Eletrico';
                                break;
                            case 'psychic':
                                button.textContent = 'Psiquico';
                                break;
                            case 'ice':
                                button.textContent = 'Gelo';
                                break;
                            case 'dragon':
                                button.textContent = 'Dragão';
                                break;
                            case 'dark':
                                button.textContent = 'Noturno';
                                break;
                            case 'fairy':
                                button.textContent = 'Fada';
                                break;
                            default:
                                button.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                        }
                        button.classList.add('button', `button-${type.toLowerCase()}`); 
                        button.addEventListener('click', () => {
                            const allButtons = document.querySelectorAll('.button-grid button');
                            allButtons.forEach(btn => {
                                if (btn.textContent !== button.textContent) {
                                    btn.classList.toggle('collapsed');
                                }
                            });

                            const lis = document.querySelectorAll('.card');
                            lis.forEach(li => {
                                li.style.display = 'none';
                            });

                            const pokemonsOfType = document.querySelectorAll(`.${type}`);
                            pokemonsOfType.forEach(pokemon => {
                                pokemon.style.display = 'block';
                            });
                        });
                        tipoButton.appendChild(button);
                    }
                });
            })
            .catch(error => {
                console.error('Erro de Pokémon:', error);
            });

        const pokemonPromises = generatePokemonPromises();

        Promise.all(pokemonPromises)
            .then(pokemons => {
                const html = generateHTML(pokemons);
                inserirPokemons(html);
            });
        