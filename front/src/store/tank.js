import { getTank, getTanks } from '@/services/tank.service'

const mutations = {
  setTank (state, tank) {
    state.tank = tank
  },

  setTanks (state, tanks) {
    state.tanks = tanks
  },

  setTankError (state, error) {
    state.tankError = error
  }
}

const actions = {
  async fetchTank ({ commit }, id) {
    try {
      const tank = await getTank(id)
      commit('setTank', tank)
    } catch (err) {
      commit('setTankError', err)
    }
  },

  async fetchTanks ({ commit }) {
    try {
      const tanks = await getTanks()
      commit('setTanks', tanks)
    } catch (err) {
      commit('setTankError', err)
    }
  }
}

const getters = {
  tank: ({ tank }) => tank,
  tanks: ({ tanks }) => tanks,
  tankError: ({ tankError }) => tankError
}

const state = () => ({
  tank: {},
  tanks: [],
  tankError: null
})

export default {
  mutations,
  actions,
  getters,
  state
}
