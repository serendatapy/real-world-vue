import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'
// import event from .... --> if you export the entire object as 1 object

Vue.use(Vuex)

/**
 * To access base State from modules you can use rootState, retrieved from context object
 * createEvent({commit,rootState},event){...}
 * 
 * However, Actions, Mutations and Getters are always registered under the GLOBAL namespace
 * $store even when using modules, so no special syntax needed to call them among modules
 * This could in any case name collision so there is a way of doing module namespacing
 * 
 * 
 */

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})