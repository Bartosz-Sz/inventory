<template>
  <div class="appWrapper">
    <div v-if="loadingstaticData">
      Loading static data...
    </div>
    <nested-list v-else :items="inventory" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NestedList from './components/NestedList.vue';
import { InventoryObject } from './store';

@Options({
  components: {
    NestedList,
  },
})
export default class App extends Vue {
  loadingstaticData = false

  get inventory(): Array<InventoryObject> {
    return this.$store.getters.inventory
  }

  loadStaticData(): void {
    this.loadingstaticData = true
    this.$store.dispatch('loadStaticData')
    this.loadingstaticData = false
  }

  beforeMount(): void {
    this.loadStaticData()
  }
}
</script>

<style lang="scss" scoped>
.appWrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;

  * {
    box-shadow: gray 5px 5px 15px;
  }
}
</style>

<style lang="scss">
// Global styles
body {
  margin: 0;
  overflow: hidden;
}
* {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
}
</style>
