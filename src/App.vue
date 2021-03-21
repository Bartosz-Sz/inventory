<template>
  <div class="appWrapper flex items-center justify-center">
    <div v-if="loadingstaticData">
      Loading static data...
    </div>
    <tree
      v-else
      :items="inventory"
      isRootList
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Tree from '@/components/Tree.vue'
import { InventoryObject } from './store'
import "tailwindcss/tailwind.css"

@Options({
  components: {
    Tree,
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

<style lang="postcss" scoped>
.appWrapper {
  width: 100vw;
  height: 100vh;
  background-color: lightgray;

  * {
    box-shadow: gray 5px 5px 15px;
  }
}
</style>

<style lang="postcss">
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
