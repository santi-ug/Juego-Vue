import axios from "axios";

const baseURL = 'https://pokeapi.co/api/v2/'

const fetchPokemons = (pokemons, loading) => {
  try {
    loading.value = true;
    const res = fetch(baseURL + "pokemon")
      .then((res) => res.json())
      .then((data) => {
        pokemons.value.push(data.results);
      })
      .finally(() => (loading.value = false));
  } catch (error) {
    console.error(error);
  }
  console.log(pokemons.value);
};

export {
  fetchPokemons
};

