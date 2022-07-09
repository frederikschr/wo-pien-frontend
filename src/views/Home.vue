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
      <h1>Welcome {{ user.username }}!</h1>
      <div class="header">
        <div>
          <button><router-link class="routers" to="/create-session">Create</router-link></button>
          <button><router-link class="routers" to="/invites">Invites</router-link></button>
        </div>
      </div>

      <div class="sessions" v-if="sessions.length !== 0">
        <ul>
          <li v-for="session in sessions" :key="session.name">
            <div @click="loadPage(session.id)" class="session" v-motion :initial="{ opacity: 0}" :enter="{ opacity: 1, transition: {type: 'spring', stiffness: 25 }}">
              <h2>{{ session.name }}</h2>
              <img style="border-radius: 50%; width: 2em; height: 2em;" :src="`data:image/png;base64, ${session.owner.avatar}`">
              <p>{{ session.owner.username }}</p>
              <hr>
            </div>
          </li>
        </ul>
      </div>
      <h2 v-else>There are currently no sessions</h2>
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
    var failed = false
    if (this.user != null) {
      await axios.get('/session', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        failed = true
        if (e.response.status === 401) {
          app.$store.dispatch('user', null)
          app.$router.push('/')
        } else {
          console.log(e)
        }
      }).then(function (response) {
        if (!failed) {
          app.$store.dispatch('sessions', response.data.sessions)
        }
      })
    }
  },
  data () {
    return {
      url: null
    }
  },

  methods: {
    loadPage (session) {
      this.$router.push('/view-session/' + session)
    },
    onFileChange (e) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      this.url = url
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
  padding-top: 4em;
  width: 75%;
  margin: 0% auto;
}

 .directions {
  margin: auto 0;
}

.directions button{
  margin: 5em 3em;
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
  grid-gap: 1em;
}

.header button {
  margin: 1em;
}

.sessions {
  position: relative;
  padding-top: 1em;
  width: 50%;
  margin: 0 auto;
}

.sessions ul {
  list-style: none;
  padding: 0;
}

hr {
  border-top: 4px solid rgba(0, 136, 169, 1);
  border-radius: 5px;
  margin: auto;
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

h2 {
  margin-top: 1em;
}

 @media only screen and (max-width: 700px) {
   .hello button {
     padding: 2em 5em;
     font-size: .3em;
   }

   .sessions {
     width: 75%;
   }

   .directions {
     margin-top: 5em;
   }

   .header button {
     margin-top: 1em;
     font-size: 1em;
   }

   h3 {
     font-size: 1.2em;
   }
 }

</style>
