import EventShow from './EventShow'

<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="hasNextPage">
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
    hasNextPage() {
      return this.event.eventsTotal > this.page * 3
    },
    ...mapState(["event", "user"]),
  },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: 3, // <-- How many items to display per page
      page: this.page, // <-- What page we're on
    });
  },
};
</script>