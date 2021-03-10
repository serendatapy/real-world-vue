<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event is created by {{ user.id }}</p>
    <p>Event ID: {{ getEventById(1) }}</p>
    <p>There are {{ getCatCount }} categories</p>
    <p>In Categories:</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"; // helpers to get list of state properties and getters
export default {
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
  computed: {
    ...mapGetters(["getEventById", "getCatCount"]),
    ...mapState(["categories", "user"]), //array of strings of state values we want
  },
};
</script>