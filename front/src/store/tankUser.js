import { getTankUsers, postUser } from '@/services/tankUser.service'

const mutations = {

  setTankUser (state, tankUsers) {
    state.tankUsers = tankUsers
  },

  setTankUserError (state, error) {
    state.tankUserError = error
  },

  createTankUser (state, newTankUser) {
    state.newTankUser.unshift(newTankUser)
  },

  createUser (state, newUser) {
    state.users.unshift(newUser)
  }
}

const actions = {

  async fetchTankUser ({ commit }) {
    try {
      const tankUsers = await getTankUsers()
      commit('setTankUser', tankUsers)
    } catch (err) {
      commit('setTankError', err)
    }
  },

  async putUser ({ commit }, name, putMilk) {
    try {
      const users = await postUser(name, putMilk)
      commit('createUser', users)
    } catch (err) {
      commit('setTankError', err)
    }
  }

}

const getters = {
  user: ({ user }) => user,
  users: ({ users }) => users,
  tankUser: ({ tankUser }) => tankUser,
  tankUsers: ({ tankUsers }) => tankUsers,
  tankUserError: ({ tankUserError }) => tankUserError
}

const state = () => ({
  user: {},
  users: [],
  tankUser: {},
  tankUsers: []
})

export default {
  mutations,
  actions,
  getters,
  state
}
