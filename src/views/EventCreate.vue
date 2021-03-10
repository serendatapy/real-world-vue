<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event is created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <p>In Categories:</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{cat}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapState(["categories", "user"]), //array of strings of state values we want
  },
};
</script>