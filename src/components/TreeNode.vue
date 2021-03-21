<template>
  <div
    class="w-full"
    :class="{ highlight }"
    @mouseenter="highlight = true"
    @mouseleave="highlight = false"
  >
    <div class="itemLabel flex flex-nowrap">
      <div
        class="evolve-btn w-4 flex-shrink-0 text-center cursor-pointer"
        @click="toggleEvolution"
      >
        {{ hasChildren ? (evolved ? "-" : "+") : '' }}
      </div>
      <div>
        {{ name }}
      </div>
      <div v-if="ownIssues > 0" class="ownIssues">
        {{ ownIssues }}
      </div>
      <div v-if="hasChildren">
        {{ nestedIssues }}
      </div>
    </div>
    <div
      v-if="hasChildren && evolved"
      class="flex flex-nowrap"
      @mouseenter="highlight = false"
      @mouseleave="highlight = true"
    >
      <div class="w-5"><!-- Indent --></div>
      <component :is="tree" :items="item.children" :totalIssues="totalIssues" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { InventoryObject } from '@/store'
import Tree from './Tree.vue'

export default class TreeNode extends Vue {
  @Prop(Object) item!: InventoryObject
  @Prop(Number) totalIssues!: number

  tree = Tree

  evolved = false

  highlight = false

  toggleEvolution(): void {
    this.evolved = !this.evolved;
  }

  get hasChildren(): boolean {
    return Boolean(this.item.children?.length)
  }

  get name(): string {
    return this.item.name
  }

  get ownIssues(): number {
    return Number(this.item.discoveredIssues)
  }

  get nestedIssues(): number {
    return this.item.nestedIssues
  }
 }
</script>

<style lang="postcss" scoped>
.highlight {
  background: lightgreen;
  transition: background 0.22s;
}
.itemLabel {
  white-space: nowrap;

  .ownIssues {
    background: red;
    border-radius: 6px;
    padding: 0 4px;
    color: white;
  }

  & > * {
    margin: 2px;
  }
}
</style>
