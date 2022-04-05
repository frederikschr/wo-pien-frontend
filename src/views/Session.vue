<template>
  <div class="view-session">
      <form @submit.prevent="handleUpdate()">
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
      <label><i>Items</i></label><br><br>
      <b>Bought by Host:</b><br>
      <div class="items">
        <table class="owner-items">
          <thead>
            <tr>
              <td>Item</td>
              <td align="center">QTY</td>
              <td align="center">P / U</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in session.items" :key="item">
              <td>{{ item.name }}</td>
              <td>{{ item.amount }}</td>
              <td><input v-model="item.price" type="number" class="form-control" placeholder="Cost"></td>
            </tr>
          </tbody>
        </table>
        <br>
      </div>

      <button class="btn btn-primary btn-lock" id="update">Update</button>

    </form>
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
    },
    handleUpdate () {
      console.log('updated')
      for (var i = 0; i < this.session.items.length; i++) {
        console.log(this.session.items[i].price)
      }
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

label {
  margin-top: 5%;
}

.owner-items {
  width: 100%;
  margin-top: 5%;
  table-layout: fixed;
  border-radius: 20px;
}

.owner-items thead tr {
  border-bottom: 3px solid rgba(0, 136, 169, .3);
}

.owner-items td {
  padding: .5em;
  background: none;
  text-align: center;
  border-right: 3px solid rgba(0, 136, 169, .3);
  overflow-wrap: break-word;
}

.owner-items td:first-child {
  width: 50%;
}

.owner-items td:nth-child(2) {
  width: 20%;
}

.owner-items td:last-child {
  border-right: none;
}

@media only screen and (max-width: 700px) {
    .view-session {
        margin: 25% auto;
        width: 70%;
    }
}
</style>
