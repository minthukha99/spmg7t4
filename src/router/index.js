import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Courses from "@/components/Course.vue";
import Skills from "@/components/Skill.vue";
import LearningJourney from "@/components/LearningJourney.vue";
import Roles from "@/components/Role.vue";
import AddCourse from "@/components/AddCourse.vue";
import AddSkill from "@/components/AddSkill.vue";
import AddRole from "@/components/AddRole.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/AddCourse",
    name: "Add Course",
    component: AddCourse,
    meta: {
      visible: true,
    },
  },
  {
    path: "/AddSkill",
    name: "Add Skill",
    component: AddSkill,
    meta: {
      visible: true,
    },
  },
  {
    path: "/AddRole",
    name: "Add Role",
    component: AddRole,
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