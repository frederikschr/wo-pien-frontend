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
      <b>Items</b><br>
      <div class="session-items">
        <div style="height: 15 em; overflow-y: scroll;">
          <table class="items">
            <thead>
              <tr>
                <td>Name</td>
                <td align="center">QTY</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in session.items" :key="item">
                <td>{{ item.name }}</td>

                <!--<td v-if="user.id === session.owner.id && !item.byHost"><p style="display: inline-block;">{{ item.amount_brought }} / </p><input style="display: inline-block; width: 50%;" type="number" min="1" max="100" v-model="item.amount" class="form-control"></td>
                <td v-else-if="user.id === session.owner.id && item.byHost"><input style="width: 50%; text-align: center; margin: 0 auto;" type="number" v-model="item.amount" class="form-control"></td>
                <td v-else-if="user.id !== session.owner && !item.byHost">{{ item.amount_brought }} / {{ item.amount }}</td>-->
                <td>{{ item.amount_brought }} / {{ item.amount }}</td>
                <td v-if="item.amount_brought !== item.amount"><i @click="bringItem(item)" class="fa fa-plus" style="color: rgba(0, 136, 169, 1)"></i></td>
                <td v-else><i class="fa fa-close" style="color: red;"></i></td>
              </tr>
            </tbody><br>
            <tfoot>
              <tr>
                <td colspan="2">Total</td>
                <td>{{ getTotalPrice }}€</td>
              </tr>
            </tfoot>
          </table>
        </div><br><br>
        <div class="myItems" v-if="myItems.length !== 0">
          <b>Your Items</b><br><br>
          <div style="height: 15em; overflow-y: scroll;">
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in myItems" :key="item">
                  <td>{{ item.name }}</td>
                  <td v-if="!item.already_existed"><input v-model="item.bring_amount" class="form-control" type="number" style="width: 50%; display: inline-block;"><p> / {{ item.amount - item.amount_brought }}</p></td>
                  <td v-else><input v-model="item.bring_amount" class="form-control" type="number" style="width: 50%; display: inline-block;"><p> / {{ item.amount }}</p></td>
                  <td><button type="button" style="background: white; cursor: pointer;" @click="removeItem(item)"><i class="fa fa-close" style="color: red;"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div><br>

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
      session: { name: '', description: '' },
      myItems: []
    }
  },
  computed: {
    ...mapGetters(['user', 'sessions']),
    getTotalPrice () {
      var total = 0
      for (var i = 0; i < this.session.items_by_host.length; i++) {
        var item = this.session.items_by_host[i]
        if (item.price >= 0) {
          total += item.price * item.amount
        }
      }
      return parseFloat(total.toString().slice(0, 6))
    }
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
        app.myItems = app.session.my_items
        for (var i = 0; i < app.myItems.length; i++) {
          app.myItems[i].already_existed = true
        }
      })
    },
    getUpdatedItems () {
      var items = []
      for (var i = 0; i < this.myItems.length; i++) {
        items.push(this.myItems[i])
      }
      return items
    },
    async handleUpdate () {
      const app = this
      await axios.patch('/bring-items', {
        updated_items: this.getUpdatedItems()
      },
      {
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
        app.getSession()
      })
    },
    bringItem (item) {
      for (var i = 0; i < this.myItems.length; i++) {
        if (this.myItems[i].id === item.id) {
          return false
        }
      }
      item.bring_amount = 1
      this.myItems.push(item)
    },
    removeItem (item) {
      for (var i = 0; i < this.myItems.length; i++) {
        if (this.myItems[i] === item) {
          this.myItems.splice(i, 1)
        }
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

.view-session table {
  width: 100%;
}

.view-session table thead td {
  border-bottom: 3px solid rgba(0, 136, 169, .3);
}

.view-session table td {
  padding: .5em;
  background: none;
  text-align: center;
  border-right: 3px solid rgba(0, 136, 169, .3);
  overflow-wrap: break-word;
}

.view-session table tfoot td:first-child {
  border-top: 3px dashed rgba(0, 136, 169, .3);
  border-right: none;
  text-align: right;
}

.view-session table tfoot td:last-child {
  border-top: 3px dashed rgba(0, 136, 169, .3);
}

.view-session table td:first-child {
  width: 50%;
}

.view-session table td:nth-child(2) {
  width: 35%;
}

.view-session table td:last-child, .myItems table td:nth-child(2) {
  border-right: none;
}

.view-session .myItems table thead tr:nth-child(2) {
  border-bottom: none;
}

.view-session .items tbody tr td:nth-child(2) {
  border-right: none;
}

@media only screen and (max-width: 700px) {
    .view-session {
        margin: 25% auto;
        width: 70%;
    }
}
</style>
