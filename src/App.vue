<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/agent-select">Battle</RouterLink>
      </nav>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  padding: 2rem 40rem;
  background-color: #464646;
}

nav a {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

nav a:hover {
  color: #b6b6b6;
}

</style>
