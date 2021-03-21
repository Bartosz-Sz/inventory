<template>
  <div :class="{ rootListWrapper: isRootList }" class="listWrapper">
    <template v-if="items.length">
      <component
        :is="ListItem"
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { InventoryObject } from '@/store';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import ListItem from '@/components/ListItem.vue';

export default class NestedList extends Vue {
  @Prop(Array) items: Array<InventoryObject> = []
  @Prop(Boolean) isRootList = false

  ListItem = ListItem
}
</script>

<style lang="scss" scoped>
.listWrapper {
  display: flex;
  flex-flow: column nowrap;
  background-color: white;
  overflow: auto;

  &.rootListWrapper {
    width: 498px;
    max-height: 80%;
    min-height: 500px;
    max-width: 80%;
    padding: 8px;
  }
}
</style>
