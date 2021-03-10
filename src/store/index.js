import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { //similar to data:
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [
      { id: 1, title: '...', organizer: '' },
      { id: 2, title: '...', organizer: '' },
      { id: 3, title: '...', organizer: '' },
      { id: 4, title: '...', organizer: '' },
    ],
    count: 0
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    }
  },//update or mutate state
  actions: { //recommended you always put mutations inside actions (future proof)
    updateCount({ state, commit }, value) {//context object, here we destructure it
      if (state.user) {
        commit('INCREMENT_COUNT', value)
      }
    }

  },
  getters: { //similar to computed state - good for states that require processing
    getCatCount: state => {
      return state.categories.length
    },
    getEventById: state => id => { //takes state and returns another function that takes id
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
});
