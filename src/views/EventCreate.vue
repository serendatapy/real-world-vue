<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>

    <form>
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>

    <!-- <p>This event is created by {{ user.id }}</p>
    <input type="number" v-model.number="incrementBy" />
    <button @click="incrementCount">
      Increment {{ this.$store.state.count }}
    </button>
    <p>Event ID: {{ getEventById(1) }}</p>
    <p>There are {{ getCatCount }} categories</p>
    <p>In Categories:</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul> -->
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
    export default {
      components: {
        Datepicker
      },
      data() {
        const times = []
        for (let i = 1; i <= 24; i++) {
          times.push(i + ':00')
        }
        return {
          event: this.createFreshEvent(),
          times,
          categories: this.$store.state.categories,
        }
      },
      methods: {
        createFreshEvent() {
          const user = this.$store.state.user
          const id = Math.floor(Math.random() * 10000000)
          return {
            id: id,
            category: '',
            organizer: user,
            title: '',
            description: '',
            location: '',
            date: '',
            time: '',
            attendees: []
          }
        }
      }
    }

// import { mapState, mapGetters } from "vuex"; // helpers to get list of state properties and getters
// export default {
//   data() {
//     return {
//       incrementBy: 1,
//     };
//   },
//Simple access to STORE, thought could be done directly in template too
// computed: {
//     userName() {
//       return this.$store.state.user.name
//     }
//   }

// Access with Mapstate - long syntax - when names need changing
// computed: mapState({
//   userName: state => state.user.name,
//   categories: 'categories' // <-- simplified syntax for top-level State
// }),

// Access with Mapstate - short syntax - useful if no naming necessary
//computed: {mapState(['categories', 'user']) //array of strings of state values we want

//If we wanted to add extra computed properties we could use spread operator
//   computed: {
//     ...mapGetters(["getEventById", "getCatCount"]),
//     ...mapState(["categories", "user"]), //array of strings of state values we want
//   },
//   methods: {
//     incrementCount() {
//       this.$store.dispatch("updateCount", this.incrementBy);
//     },
//   },
// };
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>