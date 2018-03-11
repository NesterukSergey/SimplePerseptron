<template>
  <div class="digit">
    <table>
      <tr v-for="(row, r) in digit" :key="r">
        <td v-for="(column, c) in row"
            :key="c"
            :class="{black: !!digit[r][c], white: !digit[r][c]}"
            @click="changeCell(c, r)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    data() {
      return {
        digit: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      }
    },
    methods: {
      changeCell(c, r) {
        Vue.set(this.digit[r], [c], (this.digit[r][c] === 1) ? 0 : 1);
      }
    },
    watch: {
      digit(oldVal, newVal) {
        let a = [];
        newVal.forEach(function(row) {
          row.forEach(function(elem) {
            a.push(elem);
          })
        });

        this.$emit('recognizingDigitChanged', { digit: a });
      }
    }
  }
</script>

<style lang="sass" scoped>
  $cellSize: 22px

  .digit
    display: flex
    flex-direction: column
    align-items: center
    min-width: $cellSize*3

  table, tr, td
    border: 1px solid black

  tr
    height: $cellSize

  td
    width: $cellSize

  .white
    background-color: white

  .black
    background-color: black

</style>
