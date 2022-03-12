<template>
  <div class="invites">
    <h1>Invites</h1>
    <div class="invited-sessions">
      <h2 v-if="invited_sessions.length === 0">There are currently no pending invites</h2>
      <ul v-else v-for="session in invited_sessions" :key="session.name">
        <li>
          <h3>{{ session.name }}</h3>
          <p>{{ session.owner.username }}</p>
          <button class="handle" @click="handleInvite(session.id, true)"><i class="fa fa-check" style="color: rgba(0, 136, 169, 1)"></i></button>
          <button class="handle" @click="handleInvite(session.id, false)"><i class="fa fa-close" style="color: red"></i></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Invites',
  data () {
    return {
      invited_sessions: []
    }
  },
  async created () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    } else {
      const app = this
      await axios.get('/session', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        console.log(e)
      }).then(function (response) {
        app.invited_sessions = response.data.invited_sessions
      })
    }
  },
  methods: {
    async handleInvite (session, accepted) {
      // const app = this
      var failed = false
      await axios.patch('/session', {
        session: session,
        accepted: accepted
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        failed = true
        console.log(e)
      }).then(function (response) {
        if (!failed) {
          console.log(response.data)
        }
      })
    }
  }
}
</script>

<style>

.invites {
  text-align: center;
  padding-top: 100px;
  width: 75%;
  margin: 5% auto;
}

.invites ul {
  padding: 3em 2em;
  list-style-type: none;
}

h3 {
  color: black;
}

.handle {
  background: white;
  color: black;
}

</style>
