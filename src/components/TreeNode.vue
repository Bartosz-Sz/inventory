<template>
  <div class="w-full">
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
    <div v-if="hasChildren && evolved" class="flex flex-nowrap">
      <div class="w-5"><!-- Indent --></div>
      <component :is="tree" :items="item.children" />
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

  tree = Tree

  evolved = false

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
    const getSubtreeIssues = (currentItem: InventoryObject): number => {
      const ownIssues = Number(currentItem.discoveredIssues)
      const hasChildren = Boolean(currentItem.children?.length)
      if (!hasChildren) return ownIssues

      const nestedIssues = currentItem.children.reduce((acc, child) => {
        return acc + getSubtreeIssues(child)
      }, 0)

      return ownIssues + nestedIssues
    }

    return getSubtreeIssues(this.item) - this.ownIssues
  }
 }
</script>

<style lang="postcss" scoped>
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
