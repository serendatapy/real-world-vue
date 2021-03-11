import EventService from '@/services/EventService.js'

export const namespaced = true
/**
 * When NAMESPACED,  
 * reference to these throghout the code will be as before with the namespace included
 * e.g. this.$store.dispatch('event/fetchEvent', this.id)
 * Using MAPACTIONS this can be shortened
 * 
 * created() {
 *  this.fetchEvent(this.id)
 * }
 * methods: mapActions('event'['fetchEvent])
 * 
 * Actions and Mutations don't change syntax, as long as they
 * are within their own module. Only call mutations from actions inside current module.
 * If they were in OTHER MODULES then
 * 
 * dispatch('moduleName/actionToCall',payload(or null),{root:true}) <-- root says look for action at root of store
 * 
 */

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

/**
 * If we wanted to access the root state in $store, we need rootState, 
 * as 'state' accesses only local one
 * 
 * createEvent({ commit, rootState }, event) {
        
          console.log('User creating Event is ' + rootState.user.user.name)
          
          return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
          })
        },
    
  Same with getters, we would say rootGetters to get $store ones.
 */

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_EVENTS_TOTAL(state, total) {
    state.eventsTotal = total
  }
}


/**
 * Calling actions and namespaced actions within other actions would be like this
 * 
 * actions: {
        createEvent({ commit, dispatch }, event) {
          ...
          dispatch('actionToCall')
        }
 * 
 * 
 * 
 * actions: {
        createEvent({ commit, dispatch }, event) {
          ...
          dispatch('moduleName/actionToCall', null, { root: true })
        }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)//post to fake api
      .then(() => {
        commit('ADD_EVENT', event) //update state
        const notification = {
          type: 'success',
          message: 'Your event has been created'
        }
        dispatch('notification/add', notification, { root: true })
      }).catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true }) //<--root:true allows it to find notification module from base
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true }) //<--root:true allows it to find notification module from base

      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true }) //<--root:true allows it to find notification module from base
        })
    }
  }
}
/**
 * to access a namespaced getter
 * this
 * computed: {
 *  getEventById(){
 *    return this.$store.getters.getEventById
 *  }
 * }
 * Or this
 * computed:mapGetters(['getEventById])
 * 
 * Would become (namespaced)
 * 
 * computed: {
 *  getEventById(){
 *    return this.$store.getters['event/getEventById']
 *  }
 * }
 * 
 * OR
 * 
 * computed:mapGetters('event', ['getEventById])
 * 
 */
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
