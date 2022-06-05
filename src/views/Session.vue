<template>
  <div class="view-session">
      <form @submit.prevent="handleUpdate()">
        <div class="edit" v-if="user.id === session.owner.id">
          <button type="button" @click="editSession()" style="float: right;">Edit</button><br><br><br>
        </div>
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
        <div class="session-items" style="width: 100%;">
            <div v-if="session.items.length !== 0" style="max-height: 15em; overflow-y: scroll;">
              <table class="all-items">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td align="center">QTY</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in session.items" :key="item">
                    <td>{{ item.name }}</td>
                    <td>{{ item.amount_brought }} / {{ item.amount }}</td>
                    <td><i @click="bringItem(item)" class="fa fa-plus" style="color: rgba(0, 136, 169, 1)"></i></td>
                  </tr>
                </tbody><br>
              </table><br>
          </div>

          <div v-if="my_items.length !== 0" style="max-height: 15em; overflow-y: scroll;">
            <b>Your Items</b><br><br>
            <table class="my-items">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Amount</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in my_items" :key="item">
                  <td>{{ item.name }}</td>
                  <td><input v-model="item.bring_amount" class="form-control" type="number" style="width: 50%; display: inline-block;"><p></p></td>
                  <td><input type="number" v-model="item.price" class="form-control"></td>
                  <td><button type="button" style="background: white; cursor: pointer;" @click="removeItem(item)"><i class="fa fa-close" style="color: red;"></i></button></td>
                </tr>
              </tbody>
            </table><br>
          </div>

          <div v-if="user.id !== session.owner.id" class="items-add">
            <label>Add Item</label><br>
            <input id="item" v-model='item_name' type="text" class="form-control" maxlength="20" placeholder="Enter Item"/>
            <input type="number" v-model='item_amount' class="form-control" placeholder="Amount">
            <button type="button" @click="addItem(this.new_items)" class="btn btn-primary btn-lock" style="float: right; margin-top: .5em; max-width: 20%; background-color: rgba(0, 136, 169, 1); border: none;">Add</button>

            <div v-if="new_items.length !== 0" class="items">
            <table class="items-table">
              <thead>
                <tr>
                  <td><b>Item</b></td>
                  <td align="center"><b>Amount</b> </td>
                </tr>
              </thead>
              <tbody>
                <tr class="item" v-for="item in new_items" :key="item" style="color: black">
                  <td>{{ item.name }}</td>
                  <td align="center">{{ item.amount }}</td>
                  <button type="button" class="del-item" @click="delItem(item, this.new_items)"><i class="fa fa-close" style="color: red;"></i></button>
                </tr>
              </tbody>
            </table>
            </div>
          </div><br>

          <div class="bringings" v-if="session.member_items.length !== 0">
            <b>Bringings</b><br><br>
            <table class="all-bringings">
              <thead>
                <tr>
                  <td>Member</td>
                  <td>Costs</td>
                </tr>
              </thead>
              <tbody>
                <tr class="bringing" v-for="[username, costs] of Object.entries(session.member_items)" :key="username" style="color: black;">
                  <td>{{ username }}</td>
                  <td>{{ costs }}€</td>
                </tr>
              </tbody>

            </table>

          </div>

        </div>

        <div><br>
        <b>Costs</b><br><br>
        <p>Total session value: {{ session.total_value }}€</p><br>
        <p>Host costs: {{ session.host_costs }}€</p><br>
        <p>Price / Guest:</p>
        <p v-if="session.members.length !== 1"> {{ session.host_costs / (session.members.length - 1) }}€</p><br>
        <p>Your expenses: {{ session.my_costs }}€</p>

      </div><br>

      <button class="btn btn-primary btn-lock" id="form-button">Update</button>
      <button v-if="user.id !== session.owner.id" type="button" class="btn btn-primary btn-lock" @click="leaveSession()" style="background: #F62020; margin: 2em; border: none;">Leave</button>

    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { session, request, item } from '../mixins'

export default {
  name: 'Session',
  mixins: [session, item],
  created () {
    if (this.$store.state.user == null || !this.userInSession()) {
      this.$router.push('/')
    } else { this.getSession(true, false) }
  },
  data () {
    return {
      session: { name: '', description: '' },
      my_items: [],
      del_items: [],
      item_name: '',
      item_amount: 1,
      new_items: []
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
    async handleUpdate () {
      const app = this
      console.log(this.session)
      const data = {
        updated_items: this.my_items,
        removed_items: this.del_items,
        session_id: this.session.id,
        new_items: this.new_items
      }
      const response = await request.methods.postData('patch', '/bring-items', data, app)
      app.getSession(true, false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      app.$store.dispatch('flashed', { message: response.data.message, success: true })
    },
    bringItem (item) {
      for (var i = 0; i < this.my_items.length; i++) {
        if (this.my_items[i].id === item.id) {
          return false
        }
      }
      item.bring_amount = 1
      this.my_items.push(item)
    },
    removeItem (item) {
      for (var i = 0; i < this.my_items.length; i++) {
        if (this.my_items[i] === item) {
          this.my_items.splice(i, 1)
          if (item.already_existed) {
            this.del_items.push(item)
          }
        }
      }
    },
    editSession () {
      this.$router.push('/edit-session/' + this.$route.params.id)
    },
    async leaveSession () {
      if (confirm('Are you sure you want to delete this session?')) {
        const app = this
        const data = {
          session: this.session.id
        }
        const response = await request.methods.postData('patch', '/session', data, app)
        this.$router.push('/')
        app.$store.dispatch('flashed', { message: response.data.message, success: true })
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

.session-items table {
  width: 100%;
  table-layout: fixed;
}

.all-items thead td, .my-items thead td, .all-bringings thead td {
  border-bottom: 3px solid rgba(0, 136, 169, .3);
}

.all-items td, .my-items td, .all-bringings td {
  background: none;
  text-align: center;
  border-right: 3px solid rgba(0, 136, 169, .3);
}

.all-items td, .all-bringings td {
  padding: .5em;
}

.my-items td {
  padding: .2em;
}

.session-items tfoot td:first-child {
  border-top: 3px dashed rgba(0, 136, 169, .3);
  border-right: none;
  text-align: right;
}

.all-items tfoot td:last-child {
  border-top: 3px dashed rgba(0, 136, 169, .3);
}

.all-items td:first-child {
  width: 50%;
}

.all-items td:nth-child(2) {
  width: 35%;
}

.session-items td:last-child {
  border-right: none;
}

.all-items tr:nth-child(2) {
  border-bottom: none;
}

.all-items tbody tr td:nth-child(2), .my-items tbody tr td:nth-child(3) {
  border-right: none;
}

.my-items td:first-child {
  width: 30%;
}

.my-items td:nth-child(2) {
  width: 45%;
}

.my-items td:last-child {
  width: 25%;
}

@media only screen and (max-width: 700px) {
    .view-session {
        margin: 25% auto;
        width: 80%;
    }
}
</style>
