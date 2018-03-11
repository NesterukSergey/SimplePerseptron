<template>
  <div>
    Какой элемент распознаём:
    <input list="elementToRecognize" v-model="indexToRecognize"><br>
    <datalist id="elementToRecognize">
      <option v-for="key in setKeys" :key="key" :value="key"></option>
    </datalist>

    Порог функции активации:
    <input type="number" step="any" v-model="activationThreshold"><br>

    Количество тренировок:
    <input type="number" v-model="trainingsCount" min="0"><br>

    Скорость обучения:
    <input type="number" v-model="step" step="any" min="0.00001">
  </div>
</template>

<script>
  export  default {
    data() {
      return {
        indexToRecognize: '5',
        activationThreshold: 7,
        trainingsCount: 10000,
        step: 1,
        setKeys: this.$store.getters.keys
      }
    }
  }
</script>
