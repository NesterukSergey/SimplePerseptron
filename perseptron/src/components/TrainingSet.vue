<template>
  <div class="training-set">
    <p>Обучающая выборка: </p>
    <digit v-for="(digit, index) in setKeys" :key="index" :index="digit"></digit>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        setKeys: this.$store.getters.keys
      }
    }
  }
</script>

<style lang="sass">
  .training-set
    display: flex
    justify-content: space-around
    align-items: center
</style>
