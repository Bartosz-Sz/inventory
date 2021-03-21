<template>
  <div class="nestedListWrapper">
    Nested List:
    {{ items }}
  </div>
</template>

<script lang="ts">
import { InventoryObject } from '@/store';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import ListItem from '@/components/ListItem.vue';

@Options({
  components: {
    ListItem
  }
})
export default class NestedList extends Vue {
  @Prop(Array) items: Array<InventoryObject> = []

}
</script>

<style lang="scss" scoped>
.nestedListWrapper {
  width: 498px;
  max-height: 80%;
  min-height: 500px;
  max-width: 80%;
  padding: 8px;
  background-color: white;
  overflow: scroll;
}
</style>
