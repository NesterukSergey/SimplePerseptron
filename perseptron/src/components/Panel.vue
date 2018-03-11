<template>
  <div>
    <training-set></training-set>
    <div class="wrapper">
      <div class="settings">
        Какой элемент распознаём:
        <input list="elementToRecognize" v-model="indexToRecognize"><br>
        <datalist id="elementToRecognize">
          <option v-for="key in setKeys" :key="key" :value="key"></option>
        </datalist>

        Порог функции активации:
        <input type="number" step="1" v-model="activationThreshold"><br>

        Количество тренировок:
        <input type="number" step="1" v-model="trainingsCount" min="0" max="10000"><br>

        Скорость обучения:
        <input type="number" v-model="step" step="1" min="1">

        <input type="button" value="Обучать!" @click="train">
      </div>

      <div class="check">
        <input type="button" value="Проверить" @click="check(recognizingDigit)">
        <recognizing-digit @recognizingDigitChanged="changeDigit"></recognizing-digit>
        <div>
          <div>{{ result.conclusion }}</div>
          <div>Веса: {{ result.weights }}</div>
          <div>Взвешенная сумма: {{ result.sum }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    data() {
      return {
        weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        recognizingDigit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        items: this.$store.getters.items,
        indexToRecognize: '5',
        activationThreshold: 7,
        trainingsCount: 150,
        step: 1,
        setKeys: this.$store.getters.keys,
        result: {},
        sum: 0
      }
    },
    methods: {
      changeDigit(val) {
        this.recognizingDigit = val.digit;
      },
      check(item) {
        let conclusion = (this.proceed(item)) ? `Да, это ${this.indexToRecognize}-й элемент` : `Нет, это не ${this.indexToRecognize}-й элемент`;

        Vue.set(this.result, 'conclusion', conclusion);
        Vue.set(this.result, 'weights', this.weights);
        Vue.set(this.result, 'sum', this.sum);
      },
      proceed(item) {
        let sum = 0;
        let self = this;

        item.forEach(function (d, i) {
          sum += +(d * self.weights[i]);
        });

        let looksSimilar = (sum >= this.activationThreshold);
        console.log(`weights: ${this.weights}
        Looks similar: ${looksSimilar}; sum: ${sum}`);
        this.sum = sum;

        return looksSimilar;
      },
      train() {
        let trainingItemsCount = Object.keys(this.items).length;
        let self = this;

        for (let i = 0; i < this.trainingsCount; i++) {
          let trainingItemNumber = (i % trainingItemsCount);
          console.log(trainingItemNumber);
          let trainingItem = this.items[trainingItemNumber];

          console.log('trainingItemNumber: ' + trainingItemNumber);
          console.log('indexToRecognize: ' + this.indexToRecognize);
          console.log(`eq: ${!(+trainingItemNumber !== +this.indexToRecognize)}`);

          if (+trainingItemNumber !== +this.indexToRecognize) {
            if (this.proceed(trainingItem)) {
              console.log('DEC');
              trainingItem.forEach(function (elem, j) {
                if (elem == parseFloat(1).toFixed(3)) {
                  self.weights[j] -= +self.step;
                }
              });
            }
          } else {
            console.log('sdfsdfsdfsddfsdijbgaudrfbgahi');
            if (!this.proceed(trainingItem)) {
              console.log('INC');
              trainingItem.forEach(function (elem, j) {
                if (elem == parseFloat(1).toFixed(3)) {
                  self.weights[j] += +self.step;
                }
              });
            }
          }
        }
        alert(`Обучение завершено!`);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .wrapper
    display: flex
    flex-direction: column
    align-items: center

    .check
      display: flex
      justify-content: space-around
      align-items: center
      border: 1px dashed gray
      width: 50%
      padding: 20px

    .settings
      display: flex
      flex-direction: column
      justify-content: space-around
      width: 50%

    input
      margin-bottom: 10px
      height: 30px
</style>
