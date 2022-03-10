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
        <button><router-link class="routers" to="/create-session">Starten</router-link></button>
      </div>
      </div>
      <div class="sessions">
        <ul>
          <li v-for="session in sessions" :key="session.name">
            <div @click="loadPage(session.id)" class="session">
              <h2>{{ session.name }}</h2>
              <p>{{ session.owner.username }}</p>
              <hr>
            </div>
          </li>
        </ul>
      </div>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async created () {
    const app = this
    // const response = await axios.get('user')
    // this.$store.dispatch('user', response.data.user)
    if (this.user != null) {
      await axios.get('/session'
      ).catch(function (e) {
        console.log(e)
      }).then(function (response) {
        app.$store.dispatch('sessions', response.data.sessions)
      })
    }
  },
  methods: {
    loadPage (session) {
      console.log(session)
    }
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
}

.routers {
  text-decoration: none;
  color: white;
}

.home button:hover {
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
  padding-top: 1em;
  width: 75%;
  margin: 0 auto;
}

hr {
  border-top: 4px solid rgba(0, 136, 169, 1);
  border-radius: 5px;
  margin: auto 0;
}

.sessions li {
  padding: 1em 0;
}

.session {
  /*border: 2px solid rgb(0, 136, 169);*/
  padding: 1em 0;
}

.sessions h2, h3, p {
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
