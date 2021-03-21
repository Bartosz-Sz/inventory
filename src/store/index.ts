import { createStore } from 'vuex'
import treeJSON from '@/assets/tree.json'

const staticData: {
  resultDetails: Array<InventoryObjectRaw>
} = treeJSON

export interface InventoryObjectRaw {
  id: string | number,
  name: string,
  discoveredIssues: number,
  children: Array<InventoryObjectRaw>,
}

export interface InventoryObject extends InventoryObjectRaw {
  nestedIssues: number
}

export interface State {
  inventory: Array<InventoryObject>
}

export default createStore({
  state: {
    inventory: ([] as unknown as Array<InventoryObject>),
  },
  getters: {
    inventory(state) {
      return state.inventory
    }
  },
  mutations: {
    APPEND_TO_INVENTORY(state, batch: InventoryObject[]) {
      state.inventory.push(...batch)
    }
  },
  actions: {
    loadStaticInventory({ commit }) {
      const inventory = staticData.resultDetails

      /*
        It's early optimization, not really necessary.
        Otherwise objects need to be crawled in Tree or TreeNode (which is a bit inefficient).
      */
      const withNestedIssues = (item: InventoryObjectRaw): InventoryObject => {
        let nestedIssues = 0
        const hasChildren = Boolean(item.children?.length)
        if (!hasChildren) {
          return { ...item, nestedIssues }
        }

        const childrenWithNestedIssues = item.children.reduce((acc, child) => {
          return [...acc, withNestedIssues(child)]
        }, [] as Array<InventoryObject>)

        nestedIssues = childrenWithNestedIssues.reduce((acc, child) => {
          return acc + child.nestedIssues + child.discoveredIssues
        }, 0)

        return {
          ...item,
          children: [ ...childrenWithNestedIssues ],
          nestedIssues
        }
      }

      const inventoryWithNestedIssues = inventory.reduce((acc, item) => {
        return [
          ...acc,
          withNestedIssues(item)
        ]
      }, [] as Array<InventoryObject>)

      commit('APPEND_TO_INVENTORY', inventoryWithNestedIssues)
    }
  },
})
