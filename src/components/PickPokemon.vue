<template>
    <div>
        <h1>Pick a Pokemon</h1>
        <p>Choose a Pokemon from the list below:</p>
        <ul>
        <!-- <li v-for="pokemon in ['Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle']" :key="pokemon">
            <button @click="emit('pick', pokemon)">{{ pokemon }}</button>
        </li> -->
        <li v-for="pokemon in pokemons.value" :key="pokemon">
            <button>{{ pokemon }}</button>
        </li>
        </ul>
    </div>
</template>
    

<script setup>
import { ref } from 'vue';
import { fetchPokemons } from '../api.js';

const pokemons = ref([]);
const loading = ref(true);

fetchPokemons(pokemons, loading);
console.log(pokemons.value);
</script>

<style scoped>
</style>