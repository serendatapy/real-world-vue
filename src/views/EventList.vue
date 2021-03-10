import EventShow from './EventShow'

<template>
  <div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="this.$store.state.eventsTotal > this.page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }">
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    EventCard,
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1; //page currently on
    },
    ...mapState(["events"]),
  },
  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: 3, // <-- How many items to display per page
      page: this.page, // <-- What page we're on
    });
  },
};
</script>