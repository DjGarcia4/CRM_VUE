import { createRouter, createWebHistory } from "vue-router";
import ClientsView from "../views/ClientsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ClientsView.vue"),
      props: {
        title: "Clients",
      },
    },
    {
      path: "/add-client",
      name: "add-client",
      component: () => import("../views/NewClientView.vue"),
      props: {
        title: "Add Client",
      },
    },
    {
      path: "/edit-client/:id",
      name: "edit-client",
      component: () => import("../views/EditClient.vue"),
      props: {
        title: "Edit Client",
      },
    },
  ],
});

export default router;
