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
            <input type="text" class="form-control" v-model="address" maxlength="35" placeholder="Enter address"/>
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
            <input type="text" v-model="person" @input="findPerson(this.person)" class="form-control" id="members-field" maxlength="20" placeholder="Enter username"/>
            <button type="button" @click="addPerson(this.members, this.person)" class="btn btn-primary btn-lock" style="background-color: rgba(0, 136, 169, 1); border: none;">Add</button>
          </div>

          <div class="find-member" v-if="found_member !== ''" style="height: 2em; margin-top: 1em;">
            <p>{{ found_member }}</p>
            <i @click="addPerson(this.members, this.found_member)" class="fa fa-plus" style="color: rgba(0, 136, 169, 1); float: right;"></i>
          </div><br>

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
              <button type="button" @click="addItem(this.items)" class="btn btn-primary btn-lock" style="float: right; margin-top: .5em; max-width: 20%; background-color: rgba(0, 136, 169, 1); border: none;">Add</button>
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
        </div><br><br>

        <button class="btn btn-primary btn-lock" id="form-button">Create</button>

    </form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { people, item, request } from '../mixins'

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
      items: [],
      found_member: ''
    }
  },
  created () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    } else {
      this.members.push(this.user.username)
      console.log(this.all_users)
    }
  },
  methods: {
    async handleCreate () {
      if (this.name !== '' && this.address !== '' && this.date !== '' && this.time !== '' && this.members.length > 1) {
        const app = this
        const data = {
          name: this.name,
          description: this.desciption,
          address: this.address,
          date: this.date,
          time: this.time,
          members: this.members,
          items: this.items
        }
        const reponse = await request.methods.postData('post', '/session', data, app)
        if (typeof reponse !== 'undefined') {
          app.$store.dispatch('flashed', { message: 'Successfully created ' + app.name, success: true })
          app.$router.push('/')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
    ...mapGetters(['user', 'groups', 'all_users'])
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
