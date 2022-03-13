<template>
  <div class="invites">
    <h1>Invites</h1>
    <div class="invited-sessions">
      <h2 v-if="invited_sessions.length === 0">There are currently no pending invites</h2>
      <ul v-else v-for="session in invited_sessions" :key="session.name">
        <li class="session">
          <h3>{{ session.name }}</h3>
          <p>{{ session.description }}</p>
          <b><i class="fa fa-calendar-o" aria-hidden="true" style="padding: 1em 0.5em;"></i>{{ session.date }}</b><br>
          <b><i class="fa fa-clock-o" aria-hidden="true" style="padding: 1em 0.5em;"></i>{{ session.time }}</b>
          <p><i class="fa fa-user" aria-hidden="true" style="padding: 1em 0.5em;"></i>{{ session.owner.username }}</p>
          <button class="handle" @click="handleInvite(session.id, true)"><i class="fa fa-check" style="color: rgba(0, 136, 169, 1)"></i></button>
          <button class="handle" @click="handleInvite(session.id, false)"><i class="fa fa-close" style="color: red"></i></button>
          <hr>
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
      this.getInvites()
    }
  },
  methods: {
    async getInvites () {
      const app = this
      await axios.get('/session', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        if (e.response.status === 401) {
          app.$store.dispatch('user', null)
          app.$router.push('/')
        } else {
          console.log(e)
        }
      }).then(function (response) {
        app.invited_sessions = response.data.invited_sessions
      })
    },
    async handleInvite (session, accepted) {
      const app = this
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
        if (e.response.status === 401) {
          app.$store.dispatch('user', null)
          app.$router.push('/')
        } else {
          console.log(e)
        }
      }).then(function (response) {
        if (!failed) {
          app.$store.dispatch('flashed', { message: response.data.message, success: true })
          app.getInvites()
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

.invites button {
  margin: 0 1.5em;
}

.session {
  word-wrap: break-word;
}

h3, p, b {
  color: black;
}

.handle {
  background: white;
  color: black;
}

hr {
  border-top: 4px solid rgba(0, 136, 169, 1);
  border-radius: 5px;
  margin: auto 0;
  margin-top: 1.5em;
}

</style>
