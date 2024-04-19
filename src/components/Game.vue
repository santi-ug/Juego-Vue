<script setup>
import axios from "axios";
import { ref } from "vue";

const pokemons = ref([]);

const selectedPokemon = ref({});

const pokemonData = ref([]);

const fetchPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=200"
    );
    pokemons.value = response.data.results;
  } catch (error) {
    console.error("Error fetching Pokemon data", error);
  }
};

const showDetails = async (pokemonUrl) => {
  try {
    const response = await axios.get(pokemonUrl);

    selectedPokemon.value = {
      name: response.data.name,
      image: response.data.sprites.front_default,
    };
  } catch (error) {
    console.error("Error fetching Pokemon details", error);
  }
};


const pokemonImages = async (pokemonUrl) => {
  try {
    const response = await axios.get(pokemonUrl);

    pokemonData.value.push( {
      name: response.data.name,
      image: response.data.sprites.front_default,
    });
  } catch (error) {
    console.error("Error fetching Pokemon details", error);
  }
};

fetchPokemons().then(pokemonData);
</script>

<template>
    <div>
      <h1>Lista de Pokémon</h1>
  
      <ul>
        <li
          v-for="pokemon in pokemons"
          :key="pokemon.value"
          @click="showDetails(pokemon.url)"
        >
            <!-- {{ showDetails(pokemon.url) }} -->
            {{ pokemon.name }}
          <!-- <img :src="selectedPokemonimage" :alt="selectedPokemon.name">  -->
        </li>
      </ul>
  
      <div v-if="selectedPokemon">
        <h2>Detalles del Pokémon</h2>
  
        <!-- <div>
          <h3>{{ selectedPokemon.name }}</h3>
  
          <img :src="selectedPokemon.image" :alt="selectedPokemon.name" />
        </div> -->

        <ul>
            <li
                v-for="pokemon in pokemonImages"
                :key="pokemon.value"
            >
                <!-- {{ showDetails(pokemon.url) }} -->
                {{ pokemon.name }}
                <img :src="pokemon.image" :alt="pokemon.name"> 
            </li>
        </ul>

      </div>
    </div>
</template>
  
<style scoped>
</style>