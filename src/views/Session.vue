<template>
  <div class="view-session">
    <div class="basic">
      <h1>{{ session.name }}</h1>
      <p>{{ session.description }}</p>
    </div>
    <hr>
    <label><i>General Info</i></label>
    <div class="general">
      <b>Host:</b><p>{{ session.owner.username}}</p><br>
      <b>Address:</b><p>{{ session.address}}</p><br>
      <b>Date:</b><p>{{ session.date}}</p><br>
      <b>Time:</b><p>{{ session.time}}</p>
    </div>
    <hr>
    <label><i>People</i></label>
    <div class="people">
      <b>Accepted:</b><p v-for="member in session.members" :key="member.id">{{ member.username }}</p><br>
      <b>Invited:</b><p v-for="invited in session.invited" :key="invited.id">{{ invited.username }}</p><br>
      <u>Total:</u><p>{{ session.invited.length + session.members.length }}</p>
    </div>
    <hr>
    <label><i>Items</i></label>
    <div class="items">
      <b>Bought by Host:</b><br>
      <div v-for="item in session.items" :key="item.id">
        <p>{{ item.name }} {{ item.amount }}</p>
        <label>Price (PU)</label>
        <input v-if="user.id === session.owner.id" class="form-control" type="number" placeholder="Enter cost" style="width: 40%; display: inline-block;">
        <br>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Session',
  created () {
    if (this.$store.state.user == null || !this.userInSession()) {
      this.$router.push('/')
    } else { this.getSession() }
  },
  data () {
    return {
      session: { name: '', description: '' }
    }
  },
  computed: {
    ...mapGetters(['user', 'sessions'])
  },
  methods: {
    userInSession () {
      for (var i = 0; i < this.sessions.length; i++) {
        if (this.sessions[i].id === parseInt(this.$route.params.id)) {
          return true
        }
      }
      return false
    },
    async getSession () {
      const app = this
      await axios.get('/session', {
        params: {
          id: this.$route.params.id
        },
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
        app.session = response.data.session
      })
    }
  }
}
</script>

<style>
.view-session {
  width: 50%;
  margin: 5% auto;
  overflow-wrap: break-word;
}

.basic {
  text-align: center;
}

hr {
  border-top: 4px solid rgba(0, 136, 169, 1);
  border-radius: 5px;
  margin: auto 0;
}

.general, .people, .items {
  margin-top: 5%;
}

.general b, p {
  display: inline-block;
  padding: .3em;
}

@media only screen and (max-width: 700px) {
    .view-session {
        margin: 25% auto;
        width: 70%;
    }
}

label {
  margin-top: 5%;
}

</style>
