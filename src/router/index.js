import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-show",
    alias: "/event-here", //example of redirect, not well done for SEO
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventShow.vue"),
  },
  {
    path: "/event/create",
    name: "event-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventCreate.vue"),
  },
  //necessary in history mode as server always serves index.html
  // {
  //   path: '*', component: NotFoundComponent
  // }
];

const router = new VueRouter({
  mode: "history", //necessary to get rid of # in path
  routes,
});

export default router;
