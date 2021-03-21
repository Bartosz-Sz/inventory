import { createStore } from 'vuex'
import staticData from '@/assets/tree'

interface StaticDataParsed {
  resultDetails: Array<InventoryObject>
}

export interface InventoryObject {
  id: string,
  name: string,
  discoveredIssues: number,
  children: Array<InventoryObject>
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
    loadStaticData({ commit }) {
      const inventory = (JSON.parse(staticData) as StaticDataParsed).resultDetails
      commit('APPEND_TO_INVENTORY', inventory)
    }
  },
})
