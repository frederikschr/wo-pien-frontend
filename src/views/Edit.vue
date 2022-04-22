<template>
  <div class="edit-session">
    <h1>Edit Session</h1>
    <form @submit.prevent="commitChanges()">
      <div class="form-group">
            <label>Address</label>
            <input type="text" class="form-control" v-model="session.address" maxlength="25" placeholder="Enter address"/>
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
            <input type="text" v-model="person" class="form-control" id="members-field" maxlength="20" placeholder="Enter username"/>
            <button type="button" @click="addPerson(this.members)" class="btn btn-primary btn-lock">Add</button>
         </div>
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
              <button type="button" @click="addItem(this.items)" class="btn btn-primary btn-lock" style="float: right; margin-top: .5em; max-width: 20%">Add</button>
          </div>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="margin: 1em;">
          <label class="form-check-label" for="flexCheckDefault" style="margin: 1em; color: rgb(0, 136, 169)">
             Host
          </label>
      </div>

      <div class="items">
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
              <td v-if="!item.byHost" align="center">{{ item.amount }}</td>
              <td v-if="item.byHost" style="color: rgba(0, 136, 169, 1)">{{ item.name }}</td>
              <td v-if="item.byHost" align="center" style="color: rgba(0, 136, 169, 1)">{{ item.amount }}</td>
              <button class="del-item" @click="delItem(item)"><i class="fa fa-close" style="color: red;"></i></button>
            </tr>
          </tbody>
        </table>
      </div>

    </form><br>

    <button class="btn btn-primary btn-lock">Commit</button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { session, people } from '../mixins'

export default {
  name: 'Edit',
  mixins: [session, people],
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
      members: [],
      person: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'sessions'])
  },
  methods: {
    userIsOwner () {
      for (var i = 0; i < this.sessions.length; i++) {
        if (this.sessions[i].id === parseInt(this.$route.params.id)) {
          if (this.sessions[i].owner.id === this.user.id) {
            return true
          } else {
            break
          }
        }
      }
      return false
    },
    commitChanges () {
      console.log('changes made')
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
