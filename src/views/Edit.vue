<template>
  <div class="edit-session">
    <button type="button" @click="returnToSession()" style="float:right;">Return</button><br><br><br>
    <h1>Edit Session</h1>
    <form @submit.prevent="commitChanges()">
      <div class="form-group">
        <label>Address</label>
        <input type="text" class="form-control" v-model="session.address" maxlength="35" placeholder="Enter address"/>
      </div>

      <div class="form-group">
          <label>Date</label>
          <input type="date" class="form-control" v-model="session.date" placeholder="Enter date" min="01-03-2022" max="01-01-2023"/>
      </div>

      <div class="form-group">
          <label>Time</label>
          <input type="time" class="form-control" v-model="session.time" placeholder="Enter date" min="2022-03-01" max="2023-01-01"/>
      </div>

    <label><i>People</i></label>
    <div class="people">
        <div class="input-group">
          <input type="text" v-model="person" @input="findPerson(this.person)" class="form-control" id="members-field" maxlength="20" placeholder="Enter username"/>
          <button type="button" @click="addPerson(this.members, this.person)" class="btn btn-primary btn-lock" style="background-color: rgba(0, 136, 169, 1); border: none;">Add</button>
        </div>
      </div>

      <div class="find-member" v-if="found_member !== ''" style="height: 2em; margin-top: 1em;">
          <p>{{ found_member }}</p>
          <i @click="addPerson(this.members, this.found_member)" class="fa fa-plus" style="color: rgba(0, 136, 169, 1); float: right;"></i>
      </div><br>

      <b>Members</b>
      <div class="members-list">
        <div class="person" v-for="member in members" :key="member">
          {{ member }}
          <button type="button" class="del-person" v-if="member != this.user.username" @click="delPerson(member, this.members)"><i class="fa fa-close" style="color: red"></i></button>
        </div>
      </div><br>

      <label><i>Items</i></label>
      <div class="form-group">
          <label style="margin-top: 2em">Items</label>
          <div class="items-add">
              <input id="item" v-model='item_name' type="text" class="form-control" maxlength="20" placeholder="Enter Item"/>
              <input type="number" v-model='item_amount' class="form-control" placeholder="Amount">
              <button type="button" @click="addItem(this.session.items)" class="btn btn-primary btn-lock" style="float: right; margin-top: .5em; max-width: 20%; background-color: rgba(0, 136, 169, 1); border: none;">Add</button>
          </div>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="margin: 1em;">
          <label class="form-check-label" for="flexCheckDefault" style="margin: 1em; color: rgb(0, 136, 169)">
             Host
          </label>
      </div>

      <div v-if="session.items.length !== 0" class="items">
        <table class="items-table">
          <thead>
            <tr>
              <td><b>Item</b></td>
              <td align="center"><b>Amount</b> </td>
            </tr>
          </thead>
          <tbody>
            <tr class="item" v-for="item in session.items" :key="item" style="color: black">
              <td v-if="!item.byHost">{{ item.name }}</td>
              <td v-if="!item.byHost" align="center"><input type="number" v-model='item.amount' class="form-control"></td>
              <td v-if="item.byHost" style="color: rgba(0, 136, 169, 1)">{{ item.name }}</td>
              <td v-if="item.byHost" style="color: rgba(0, 136, 169, 1)"><input type="number" v-model='item.amount' class="form-control"></td>
              <button type="button" class="del-item" @click="delItem(item, this.session.items)"><i class="fa fa-close" style="color: red;"></i></button>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="btn btn-primary btn-lock" id="form-button">Commit</button>
      <button type="button" class="btn btn-primary btn-lock" @click="delSession()" style="background: #F62020; margin: 2em; border: none;">Delete</button>

    </form><br>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { session, people, item, request } from '../mixins'
import axios from 'axios'

export default {
  name: 'Edit',
  mixins: [session, people, item],
  created () {
    if (this.$store.state.user === null || !this.userIsOwner()) {
      this.$router.push('/')
    } else {
      this.getSession(false, true)
    }
  },
  data () {
    return {
      session: null,
      items: [],
      del_items: [],
      item_name: '',
      item_amount: 1,
      members: [],
      person: '',
      found_member: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'sessions', 'all_users'])
  },
  methods: {
    userIsOwner () {
      for (var i = 0; i < this.sessions.length; i++) {
        if (this.sessions[i].id === parseInt(this.$route.params.id)) {
          if (this.sessions[i].owner.id === this.user.id) {
            return true
          } else { break }
        }
      }
      return false
    },
    async delSession () {
      if (confirm('Are you sure you want to delete this session?')) {
        const app = this
        var failed = false
        await axios.delete('/session-edit', {
          data: {
            session_id: this.session.id
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }).catch(function (e) {
          failed = true
          if (e.response != null) {
            if (e.response.status === 401) {
              app.$store.dispatch('user', null)
              app.$router.push('/')
            } else {
              const error = Object.values(e.response.data)[0][0]
              app.$store.dispatch('flashed', { message: error, success: false })
            }
          } else {
            app.$store.dispatch('flashed', { message: 'Internal Server Error', success: false })
          }
        }).then(function (response) {
          if (!failed) {
            app.$store.dispatch('flashed', { message: response.data.message, success: true })
            app.$router.push('/')
          }
        })
      }
    },
    async commitChanges () {
      const app = this
      const data = {
        ids: { session_id: this.session.id },
        address: this.session.address,
        date: this.session.date,
        time: this.session.time,
        members: this.members,
        items: this.session.items,
        del_items: this.del_items
      }
      const response = await request.methods.postData('patch', '/session-edit', data, app)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      app.getSession(false, true)
      app.$store.dispatch('flashed', { message: response.data.message, success: true })
    },
    returnToSession () {
      this.$router.push('/view-session/' + this.$route.params.id)
    }
  }
}

</script>

<style>
.edit-session {
  width: 50%;
  margin: 5% auto;
  overflow-wrap: break-word;
}

h1 {
  text-align: center;
}

.del-person {
    height: 1.5em;
}

@media only screen and (max-width: 700px) {
    .edit-session {
        margin: 25% auto;
        width: 75%;
    }
}

</style>
