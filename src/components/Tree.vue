<template>
  <div :class="{ rootListWrapper: isRootList }" class="listWrapper">
    <template v-if="items.length">
      <component
        :is="treeNode"
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { InventoryObject } from '@/store'
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import TreeNode from '@/components/TreeNode.vue'

export default class NestedList extends Vue {
  @Prop(Array) items: Array<InventoryObject> = []
  @Prop(Boolean) isRootList = false

  treeNode = TreeNode
}
</script>

<style lang="postcss" scoped>
.listWrapper {
  overflow: auto;

  &.rootListWrapper {
    background-color: #F7F7F7;
    width: 498px;
    height: 500px;
    max-height: 80%;
    max-width: 80%;
    padding: 8px;
  }
}
</style>
