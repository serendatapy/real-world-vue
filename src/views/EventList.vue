import EventShow from './EventShow'

<template>
  <div>
    <h1>Events Listings</h1>

    <router-link :to="{ name: 'event-show', params: { id: '5' } }">
      Show Event #5
    </router-link>
  </div>
</template>