import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Courses from "@/components/Course.vue";
import Skills from "@/components/Skill.vue";
import LearningJourney from "@/components/LearningJourney.vue";
import Roles from "@/components/Role.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
    meta: {
      visible: false,
    },
  },
  {
    path: "/LearningJourney",
    name: "Learning Journey",
    component: LearningJourney,
    meta: {
      visible: true,
    },
  },
  {
    path: "/Skills",
    name: "Skills",
    component: Skills,
    meta: {
      visible: true,
    },
  },
  {
    path: "/Roles",
    name: "Roles",
    component: Roles,
    meta: {
      visible: true,
    },
  },
  {
    path: "/Courses",
    name: "Courses",
    component: Courses,
    meta: {
      visible: true,
    },
  },

];

// testing
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
