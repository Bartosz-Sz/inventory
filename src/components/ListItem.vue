<template>
  <div class="listeIremWrapper">
    <div class="itemLabel">
      <div class="evolve-btn" @click="toggleEvolution">
        {{ hasChildren ? (evolved ? "-" : "+") : '' }}
      </div>
      <div class="name">{{ name }}</div>
      <div class="ownIssues">{{ ownIssues }}</div>
      <div class="nestedIssues">{{ nestedIssues }}</div>
    </div>
    <div class="children" v-if="hasChildren && evolved">
      <div class="indent"></div>
      <component :is="NestedList" :items="item.children" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InventoryObject } from '@/store';
import NestedList from './NestedList.vue';

export default class ListItem extends Vue {
  @Prop(Object) item!: InventoryObject

  NestedList = NestedList

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
    const getSubtreeIssues = (parentItem: InventoryObject): number => {
      const ownIssues = Number(parentItem.discoveredIssues)
      const hasChildren = Boolean(parentItem.children?.length)
      if (hasChildren) return ownIssues

      const nestedIssues = parentItem.children.reduce((acc, child) => {
        return acc + getSubtreeIssues(child)
      }, 0)

      return ownIssues + nestedIssues
    }

    return getSubtreeIssues(this.item)
  }
 }
</script>

<style lang="scss" scoped>
.listeIremWrapper {
  width: 100%;

  .evolve-btn {
    width: 14px;

    &:hover {
      cursor: pointer;
    }
  }

  .itemLabel {
    display: flex;
    flex-flow: row nowrap;

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

  .children {
    display: flex;
    flex-flow: row nowrap;

    .indent {
      width: 20px;
    }
  }
}
</style>
