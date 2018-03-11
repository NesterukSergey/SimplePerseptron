<template>
  <div class="digit">
    <div> {{ digitName }} </div>
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
  export default {

    props: {
      index: {}
    },
    data() {
      return {
        trainingItem: this.$store.getters.item(this.index)
      }
    },
    computed: {
      digitName() {
        return this.index;
      },
      digit() {
        let a = [];

        for (let i = 0; i < 15; i += 3) {
          a.push(this.trainingItem.slice(i, i + 3));
        }

        return a;
      }
    },
    methods: {
      changeCell(column, row) {
        let cell = row * 3 + column;

        this.$store.commit('changeCell', {item: this.digitName, number: cell});
      }
    }
  }
</script>

<style lang="sass" scoped>
  $cellSize: 15px

  .digit
    display: flex
    flex-direction: column
    align-items: center

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
