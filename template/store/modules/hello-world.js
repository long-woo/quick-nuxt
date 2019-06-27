import * as types from '../mutation-types'

export const state = () => ({
  userName: ''
})

export const getters = {
  userName: state => state.userName
}

export const mutations = {
  [types.SET_USERNAME](state, name) {
    state.userName = name
  }
}

export const actions = {
  setUserName({ commit, state }, name) {
    commit(types.SET_USERNAME, name)
  }
}
