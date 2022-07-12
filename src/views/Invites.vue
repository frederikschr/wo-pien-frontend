<template>
  <div class="invites">
    <h1>Invites</h1>
    <div class="invited-sessions">
      <h2 v-if="invited_sessions.length === 0">There are currently no pending invites</h2>
      <ul v-else v-for="session in invited_sessions" :key="session.name">
        <li class="session">
          <h3>{{ session.name }}</h3>
          <p>{{ session.description }}</p><br>
          <b><i class="fa-solid fa-calendar-days" aria-hidden="true" style="padding-right: .5em;"></i>{{ session.date }}</b>
          <b><i class="fa-solid fa-clock" aria-hidden="true" style="padding-right: .5em; margin-left: .5em;"></i>{{ session.time }}</b><br>
          <p><i class="fa fa-user" aria-hidden="true" style="padding-right: .5em; margin-top: 1em;"></i>{{ session.owner.username }}</p><br>
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
import { request } from '../mixins'

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
      if (confirm('Are you sure you want to ' + (accepted === true ? 'accept' : 'decline') + ' this session?')) {
        const app = this
        const data = {
          session: session,
          accepted: accepted
        }

        const response = await request.methods.postData('patch', '/session', data, app)
        app.getInvites()
        app.$store.dispatch('flashed', { message: response.data.message, success: true })
      }
    }
  }
}
</script>

<style>

.invites {
  text-align: center;
  width: 75%;
  margin: 5% auto;
}

.invites ul {
  padding: 2em;
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
  text-overflow: break-word;
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

@media only screen and (max-width: 700px) {
    .invites {
        margin: 15% auto;
    }
}

</style>
