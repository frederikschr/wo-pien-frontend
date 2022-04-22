<template>
  <div class="create">
    <h1>Create dicke Piener session</h1>

     <form @submit.prevent="handleCreate()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" maxlength="30" placeholder="Enter name of session"/>
        </div>

        <div class="form-group" id="description">
            <label>Description</label>
            <textarea v-model="desciption" cols="20" rows="5" placeholder="Add description" maxlength="300"></textarea>
        </div>
        <div class="form-group">
            <label>Address</label>
            <input type="text" class="form-control" v-model="address" maxlength="25" placeholder="Enter address"/>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-control" v-model="date" placeholder="Enter date" min="01-03-2022" max="01-01-2023"/>
        </div>

        <div class="form-group">
            <label>Time</label>
            <input type="time" class="form-control" v-model="time" placeholder="Enter date" min="2022-03-01" max="2023-01-01"/>
        </div>

        <div class="form-goup">
          <label>Members</label>
          <div class="input-group">
            <input type="text" v-model="person" class="form-control" id="members-field" maxlength="20" placeholder="Enter username"/>
            <button type="button" @click="addPerson(this.members)" class="btn btn-primary btn-lock">Add</button>
          </div>
          <b>Members</b>

          <div id="people" style="overflow-y: scroll; height:10em;">
            <div class="person" v-for="person in members" :key="person">
              {{ person }}
              <button class="del-person" v-if="person != this.user.username" @click="delPerson(person, this.members)"><i class="fa fa-close" style="color: red"></i></button>
            </div>
          </div>

          <label style="margin-top: 1em;">Groups</label>
          <div class="groups">
            <div class="group" v-for="group in groups" :key="group">
              <button class="add-group" @click="addGroup(group)">{{ group.name }}</button>
            </div>
          </div>
        </div>

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
              <tr class="item" v-for="item in items" :key="item" style="color: black">
                <td v-if="!item.byHost">{{ item.name }}</td>
                <td v-if="!item.byHost" align="center">{{ item.amount }}</td>
                <td v-if="item.byHost" style="color: rgba(0, 136, 169, 1)">{{ item.name }}</td>
                <td v-if="item.byHost" align="center" style="color: rgba(0, 136, 169, 1)">{{ item.amount }}</td>
                <button class="del-item" @click="delItem(item, this.items)"><i class="fa fa-close" style="color: red;"></i></button>
              </tr>
            </tbody>
          </table>
        </div>

        <button class="btn btn-primary btn-lock" id="submit">Create</button>

    </form>

  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { people, item } from '../mixins'

export default {
  name: 'Create',
  mixins: [people, item],
  data () {
    return {
      name: '',
      desciption: '',
      address: '',
      date: '',
      time: '',
      person: '',
      members: [],
      item_name: '',
      item_amount: 1,
      items: []
    }
  },
  created () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    } else {
      this.members.push(this.user.username)
    }
  },
  methods: {
    async handleCreate () {
      if (this.name !== '' && this.address !== '' && this.date !== '' && this.time !== '' && this.members.length > 1) {
        const app = this
        var failed = false
        await axios.post('/session', {
          name: this.name,
          description: this.desciption,
          address: this.address,
          date: this.date,
          time: this.time,
          members: this.members,
          items: this.items
        },
        {
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
        }).then(function () {
          if (!failed) {
            app.$store.dispatch('flashed', { message: 'Successfully created ' + app.name, success: true })
            app.$router.push('/')
          }
        })
      }
    },
    addGroup (group) {
      for (var i = 0; i < group.members.length; i++) {
        if (!this.members.includes(group.members[i])) {
          this.members.push(group.members[i])
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'groups'])
  }
}
</script>

<style>
.create {
  width: 50%;
  margin: 5% auto;
  margin-top: 5em;
}

.create h1 {
  text-align: center;
  margin-bottom: 1em;
}

textarea {
  width: 100%;
  float: left;
  padding: 1em 1em;
  margin-bottom: 1em;
}

.input-group button {
  margin-top: .5em;
  height: 2.5em;
}

#submit {
  float: left;
  margin-top: 2em;
}

#members-field {
  width: 50%;
}

.person {
  padding: 1em;
  height: 3em;
}

.del-person, .del-item {
    cursor: pointer;
    color: red;
    background-color: white;
    float: right;
}

#item {
  width: 50%;
}

.group {
  display: inline-block;
  margin-right: 1em;
}

.add-group {
  padding: .7em 0.6em;
  font-size: .9em;
  margin-top: 1em;
}

.items-add input {
  display: inline-block;
  width: 15%;
  margin-right: 10%;
}

.items {
  height: 10em;
  overflow-y: scroll;
}

.items-table {
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
}

.items-table td:first-child {
  width: 50%;
}

.items-table td:nth-child(2) {
  width: 25%;
}

@media only screen and (max-width: 700px) {
    .create {
        margin: 25% auto;
        width: 75%;
    }

    .items-add input {
      margin-right: 5%;
      width: 20%;
    }

}

</style>
