import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import Invites from '../views/Invites.vue'
import Session from '../views/Session.vue'
import Edit from '../views/Edit.vue'
import Logout from '../views/Logout.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create-session',
    name: 'Create',
    component: Create
  },
  {
    path: '/invites',
    name: 'Invites',
    component: Invites
  },
  {
    path: '/view-session/:id',
    name: 'Session',
    component: Session
  },
  {
    path: '/edit-session/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
