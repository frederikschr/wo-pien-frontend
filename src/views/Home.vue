<template>
  <div class="home">
    <div v-if="!user" class="hello">
      <HelloWorld msg="Welcome to WoPien"/>
      <h3>The place where you can find locations to pien at</h3>
      <div v-if="!user" class="directions">
      <button><router-link class="routers" to="login"> Login </router-link></button>
      <button><router-link class="routers" to="register"> Sign up </router-link></button>
      </div>
    </div>

    <div v-else class="base">
      <h1>Welcome {{ user.username }}</h1>
      <div class="header">
        <div>
          <input class="form-control rounded-0 py-2" type="search" id="example-search-input" placeholder="Search...">
      </div>
      <div>
        <button><router-link to="/create-session">Starten</router-link></button>
      </div>
      </div>
      <div class="sessions">
        <ul>
          <li v-for="session in sessions" :key="session.name">
            <div class="session">
              <h2>{{ session.name }}</h2>
            </div>
          </li>
        </ul>
      </div>
   </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async created () {
    // const response = await axios.get('user')
    // this.$store.dispatch('user', response.data.user)
    console.log('created')
  },
  computed: {
    ...mapGetters(['user', 'sessions'])
  }
}
</script>

<style>

.home {
  text-align: center;
  padding-top: 100px;
  width: 75%;
  margin: 5% auto;
}

.home .directions {
  display: flex;
  justify-content: center;
  align-content: space-between;
}

.home .directions button{
  margin: 80px 50px;
  text-decoration: none;
  color: white;
}

.home .directions button:hover {
  background-color: rgba(0, 136, 169, 0.8);
}

.home .routers:hover {
    color: white;
}

input {
  margin: 8px 0;
  box-sizing: border-box;
}

.header {
  padding-top: 2em;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1em;
}

.header div {
  padding: 0 1em;
}

.sessions {
  position: relative;
  padding-top: 2em;
  width: 50%;
  left: 25%;
}

.sessions li {
  padding: 1em 0;
}

.session {
  border: 2px solid rgb(0, 136, 169);
  padding: 1em 0;
}

.sessions h2, p {
  color: black;
}

 @media only screen and (max-width: 700px) {

   .home .directions button {
     margin: 80px 2em;
   }

   .hello button {
     padding: 2px 30px;
   }

   .header button {
     margin-top: 1em;
     font-size: 1em;
   }
 }

</style>
