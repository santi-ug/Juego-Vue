<script setup>
import axios from "axios";
import { ref } from "vue";
import Loading from "./Loading.vue";

const pokemons = ref([]);

const selectedPokemon = ref({});

const p1selection = ref({});
const p1Selected = ref(false);
const p1Moves = ref([]);    
const p1SelectedMove = ref({});
const p1Health = ref(0);


const p2selection = ref({});
const p2Selected = ref(false);
const p2Moves = ref([]);    
const p2SelectedMove = ref({});
const p2Health = ref(0);

const pokemonData = ref([]);

const loading = ref(true);
const agentSelect = ref(true);
const fighting = ref(false);

const fetchPokemons = async () => {
    loading.value = true;
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );
    pokemons.value = response.data.results;
    // showDetails(pokemons.value[0].url);
  } catch (error) {
    console.error("Error fetching Pokemon data", error);
  }
};

// const showDetails = async (pokemon) => {
//   try {
//     selectedPokemon.value = pokemon;
//   } catch (error) {
//     console.error("Error setting Pokemon details", error);
//   }
// };

const p1Select = async (pokemon) => {
  try {
    p1selection.value = pokemon;
    p1Selected.value = true;
    p1Health.value = pokemon.hp;
  } catch (error) {
    console.error("Error setting Pokemon details", error);
  }
};

const p2Select = async (pokemon) => {
  try {
    p2selection.value = pokemon;
    p2Selected.value = true;
    p2Health.value = pokemon.hp;
  } catch (error) {
    console.error("Error setting Pokemon details", error);
  }
};

const pokemonImages = async (pokemonUrl) => {
  try {
    const response = await axios.get(pokemonUrl);
    console.log(response.data);
    pokemonData.value.push({
        name: response.data.name,
        image: response.data.sprites.front_default,
        weight: response.data.weight,
        height: response.data.height,
        moves: response.data.moves,
        hp: response.data.stats[0].base_stat
    });
  } catch (error) {
    console.error("Error fetching Pokemon details", error);
  }
};

const getPokemonsImages = () => {
  pokemons.value.forEach((pokemon) => {
    pokemonImages(pokemon.url);
  });
};

const pokemonMoves = async (pokemonMoveUrl, playerMoves) => {
    try {
        const response = await axios.get(pokemonMoveUrl);
        if (response.data.power === null) {
            return;
        }
        playerMoves.value.push({
            name: response.data.name,
            power: response.data.power,
            type: response.data.type.name
        });
    } catch (error) {
        console.error("Error fetching Pokemon moves", error);
    }
};

const startGame = () => {
    if (p1Selected.value && p2Selected.value) {
        agentSelect.value = false;
        fighting.value = true;
        for (let i = 0; i < 4; i++) {
            pokemonMoves(p1selection.value.moves[i].move.url, p1Moves);
        }
        for (let i = 0; i < 4; i++) {
            pokemonMoves(p2selection.value.moves[i].move.url, p2Moves);
        }
    }
};

const selectMove = (move, playerMove) => {
    playerMove.value = move;
};

const findWinner = () => {
    const p1 = p1selection.value;
    const p2 = p2selection.value;
    const p1Move = p1SelectedMove.value;
    const p2Move = p2SelectedMove.value;
    const p1Damage = p1Move.value.power;
    const p2Damage = p2Move.value.power;
    p1Health.value -= p2Damage;
    p2Health.value -= p1Damage;
    if (p1Health.value <= 0 && p2Health.value <= 0) {
        alert("It's a draw!");
    } else if (p1Health.value <= 0 && p2Health.value > 0) {
        alert(`${p2.name} wins!`);
    } else if (p2Health.value <= 0 && p1Health.value > 0) {
        alert(`${p1.name} wins!`);
    } else {
        alert("Keep fighting!");
    }
};

const restart = () => {
    agentSelect.value = true;
    fighting.value = false;
    p1Selected.value = false;
    p2Selected.value = false;
    p1selection.value = {};
    p2selection.value = {};
    p1Moves.value = [];
    p2Moves.value = [];
    p1SelectedMove.value = {};
    p2SelectedMove.value = {};
    p1Health.value = 0;
    p2Health.value = 0;
};

fetchPokemons().then(() => {
  getPokemonsImages();
}).finally(() => {
  loading.value = false;
})
</script>


<template>
    <div class="container" v-if="agentSelect">
        <h1>Agent Select</h1>
        <button class="start" @click="startGame">
            Fight
        </button>
        <div class="players">
            <div class="player">
                <div class="loading" v-if="loading">
                    <Loading />
                </div>
                <div v-else>
                    <h1>Player 1 Pick</h1>
                    <div v-if="p1selection">
                      <div class="selected">
                        <div class="left">
                            <span>{{ p1selection.name }}</span>
                            <img :src="p1selection.image" :alt="p1selection.name" />
                        </div>
                        <div class="right">
                            <span>HP: {{ p1selection.hp }}</span>
                        </div>  
                      </div>
                    </div>
                    <ul>
                        <li v-for="pokemon in pokemonData" :key="pokemon.value" @click="p1Select(pokemon)" >
                            <img :src="pokemon.image" :alt="pokemon.name" />
                            {{ pokemon.name }}
                        </li>
                    </ul>
            
              </div>
            </div>
            <div class="player">
                <div class="loading" v-if="loading">
                    <Loading />
                </div>
                <div v-else>
                    <h1>Player 2 Pick</h1>
                    <div v-if="p2selection">
                      <div class="selected">
                        <div class="left">
                            <span>{{ p2selection.name }}</span>
                            <img :src="p2selection.image" :alt="p2selection.name" />
                        </div>
                        <div class="right">
                            <span>HP: {{ p2selection.hp }}</span>
                        </div>  
                      </div>
                    </div>
                    <ul>
                        <li v-for="pokemon in pokemonData" :key="pokemon.value" @click="p2Select(pokemon)" >
                            <img :src="pokemon.image" :alt="pokemon.name" />
                            {{ pokemon.name }}
                        </li>
                    </ul>
            
              </div>
            </div>
        </div>
    </div>

    <div class="container" v-else-if="fighting">
        <h1>Fighting</h1>
        <div class="selections">
            <div v-if="p1selection">
                <h1>Player 1</h1>
                <div class="selected">
                    <div class="left">
                        <span>{{ p1selection.name }}</span>
                        <img :src="p1selection.image" :alt="p1selection.name" />
                    </div>
                <div class="right">
                    <span>HP: {{ p1selection.hp }}</span>
                    <span>Current HP: {{ p1Health }}</span>
                </div>  
                </div>
                <div class="moves">
                    <h2>Moves</h2>
                    <ul>
                        <li v-for="move in p1Moves" :key="move.name">
                            <button @click="selectMove(move, p1SelectedMove)">
                                <strong>{{ move.name }}</strong>
                                <br>
                                <span>Power: {{ move.power }}</span>
                            </button>
                        </li>
                    </ul>
                    <div class="selectedMove">
                        <h3 v-if="p1SelectedMove.value">Selected Move: {{ p1SelectedMove.value.name }}</h3>
                        <h3 v-else>No move selected</h3>
                    </div>
                </div>
            </div>
            
            <div v-if="p2selection">
                <h1>Player 2</h1>
                <div class="selected">
                <div class="left">
                    <span>{{ p2selection.name }}</span>
                    <img :src="p2selection.image" :alt="p2selection.name" />
                </div>
                <div class="right">
                    <span>Max HP: {{ p2selection.hp }}</span>
                    <span>Current HP: {{ p2Health }}</span>
                </div>  
                </div>
                <div class="moves">
                    <h2>Moves</h2>
                    <ul>
                        <li v-for="move in p2Moves" :key="move.name">
                            <button @click="selectMove(move, p2SelectedMove)">
                                <strong>{{ move.name }}</strong>
                                <br>
                                <span>Power: {{ move.power }}</span>
                            </button>
                        </li>
                    </ul>
                    <div class="selectedMove">
                        <h3 v-if="p2SelectedMove.value">Selected Move: {{ p2SelectedMove.value.name }}</h3>
                        <h3 v-else>No move <s></s>elected</h3>
                    </div>
                </div>
            </div>
        </div>
        <button class="fight" @click="findWinner">
            Fight
        </button>
        <button class="restart" @click="restart">
            Restart
        </button>
    </div>
</template>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container > h1 {
    font-size: 3rem;
    margin: 2rem 0;
    text-align: center;
    font-weight: 700;
}

.players {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

ul {
    display: grid;
    grid-template-columns: 10rem 10rem 10rem 10rem 10rem;
}

li {
    width: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.player h1 {
    text-align: center;
    font-weight: 600;
    margin-bottom: 1rem;
}

.start {
    padding: 1rem 2rem;
    background-color: #f1c40f;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.start:hover {
    background-color: #f39c12;
}

.selected {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    margin-bottom: 1rem;
}

.selected span {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.selected .left {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.selected .right {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.selections {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.fight {
    padding: 1rem 2rem;
    background-color: #e74c3c;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.fight:hover {
    background-color: #c0392b;
}

.restart {
    padding: 1rem 2rem;
    background-color: #3498db;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.restart:hover {
    background-color: #2980b9;
}

.moves ul {
    display: grid;
    grid-template-columns: 10rem 10rem;
    gap: 2rem;
}

.moves ul li {
    background-color: gray;
    padding: 1rem;
    border-radius: 2rem;
}

.moves button {
    background-color: transparent;
    border: none;
}

.moves li:hover {
    background-color: #a1a1a1;
}

</style>