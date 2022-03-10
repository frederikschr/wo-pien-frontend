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

        <div>
          <label>Members</label>
          <div class="input-group">
            <input type="text" v-model="person" class="form-control" id="members-field" maxlength="20"/>
            <button type="button" @click="addPerson()" class="btn btn-primary btn-lock">Add</button>
          </div>
          <b>Members</b>
          <div class="person" v-for="person in members" :key="person">
            {{ person }}
            <button class="del-person" v-if="person != this.user.username" @click="delPerson(person)">x</button>
          </div>

        </div>

        <button class="btn btn-primary btn-lock" id="submit">Create</button>

    </form>

  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Create',
  data () {
    return {
      name: '',
      desciption: '',
      address: '',
      date: '',
      time: '',
      person: '',
      members: []
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
          members: this.members
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
    addPerson () {
      if (this.person !== '') {
        for (var i = 0; i < this.members.length; i++) {
          if (this.members[i] === this.person) {
            this.person = ''
            return false
          }
        }
        this.members.push(this.person)
        this.person = ''
      }
    },
    delPerson (person) {
      for (var i = 0; i < this.members.length; i++) {
        if (this.members[i] === person) {
          this.members.splice(i, 1)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
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

.del-person {
    cursor: pointer;
    color: red;
    background-color: white;
}

.del-person:hover {
  font-size: 1.5em;
}

@media only screen and (max-width: 700px) {
    .create {
        margin: 25% auto;
    }
}

</style>
