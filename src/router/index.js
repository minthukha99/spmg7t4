import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Courses from "@/components/Course.vue";
import Skills from "@/components/Skill.vue";
import LearningJourney from "@/components/LearningJourney.vue";
import Roles from "@/components/Role.vue";
import AssignSkillstoCourse from "@/components/AssignSkillstoCourse.vue";
import AddSkill from "@/components/AddSkill.vue";
import AddRole from "@/components/AddRole.vue";
import UpdateSkill from "@/components/UpdateSkill.vue";
import UpdateRole from "@/components/UpdateRole.vue";
import AssignSkillstoRole from "@/components/AssignSkillstoRole.vue";
import LJComponent from "@/components/LJComponent.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      visible: true,
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
    props: true,
    meta: {
      visible: true,
    },
  },
  {
    path: "/AssignSkillstoCourse/:id",
    name: "Assign Skills to Course",
    component: AssignSkillstoCourse,
    props: true,
    meta: {
      visible: false,
    },
  },
  {
    path: "/AddSkill",
    name: "Add Skill",
    component: AddSkill,
    meta: {
      visible: false,
    },
  },
  {
    path: "/UpdateSkill",
    name: "Update Skill",
    component: UpdateSkill,
    meta: {
      visible: false,
    },
  },
  {
    path: "/AddRole",
    name: "Add Role",
    component: AddRole,
    meta: {
      visible: false,
    },
  },
  {
    path: "/UpdateRole/:id",
    name: "Update Role",
    component: UpdateRole,
    props: true,
    meta: {
      visible: false,
    }
  },
  {
    path: "/LJComponent",
    name: "Learning Journey Profile",
    component: LJComponent,
    meta: {
      visible: false,
    },
  },
  {
  path: "/AssignSkillstoRole/:id",
  name: "user",
  component: AssignSkillstoRole,
  props: true,
  meta: {
      visible: false,
    },
  }
  
];

// testing
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
