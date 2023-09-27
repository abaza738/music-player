import { createRouter, createWebHistory } from "vue-router";
import PlayerVue from "./components/Player.vue";
import LogsVue from "./components/Logs.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      component: PlayerVue,
      name: "player",
    },
    {
      path: "/logs",
      component: LogsVue,
      name: "logs",
    },
  ],
});
