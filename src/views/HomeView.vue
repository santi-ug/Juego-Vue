<script setup>
</script>

<template>
  <div class="container">
    <section class="about">
      <h1>About</h1>
      <p>Welcome to the Pokemon Battle Arena</p>
      <p>This game is built using the Pokeapi</p>
    </section>
    <section class="howtoplay">
      <h1>How to Play</h1>
      <p>Choose your Pokemon and battle against your opponent</p>
      <p>Click on the Pokemon you want to choose</p>
      <p>Click on the Fight button to start the battle</p>
    </section>
    <section class="info">
      <h1>Game Info</h1>
      <p>Player 1 and Player 2 will choose their Pokemon</p>
      <p>The player with the highest score wins</p>
      <p>Score is calculated by multiplying the weight and height of the Pokemon</p>
      <p>Click on the Restart button to play again</p>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3rem;
}

section h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

section p {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
</style>