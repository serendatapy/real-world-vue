import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { //similar to data:
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [
      {id:1,title:'...',organizer:''},
      {id:2,title:'...',organizer:''},
      {id:3,title:'...',organizer:''},
      {id:4,title:'...',organizer:''},
    ]
  },
  mutations: {},
  actions: {},
  getters:{ //similar to computed state - good for states that require processing
    getCatCount: state => {
      return state.categories.length
    },
    getEventById: state => id => { //takes state and returns another function that takes id
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
});
