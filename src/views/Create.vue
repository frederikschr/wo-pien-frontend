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
          <label>People</label>
          <div class="input-group">
            <input type="text" v-model="person" class="form-control" id="people-field" maxlength="20"/>
            <button @click="addPerson()" class="btn btn-primary btn-lock">Add</button>
          </div>
          <b>People</b>
          <div class="person" v-for="person in people" :key="person">
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
      date: null,
      time: null,
      person: '',
      people: []
    }
  },
  created () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    } else {
      this.people.push(this.user.username)
    }
  },
  methods: {
    async handleCreate () {
      const app = this
      await axios.post('http://127.0.0.1:5000/session/create', {
        name: this.name,
        desciption: this.desciption,
        address: this.address,
        date: this.date,
        time: this.time,
        people: this.people
      }).catch(function (e) {
        if (e.response != null) {
          app.$store.dispatch('flashed', { message: e.response.data.error, success: false })
        } else {
          app.$store.dispatch('flashed', { message: 'Internal Server Error', success: false })
        }
      }).then(function (response) {
        app.$store.dispatch('flashed', { message: 'Created', success: true })
        app.$$router.push('/')
      })
    },
    addPerson () {
      if (this.person !== '') {
        for (var i = 0; i < this.people.length; i++) {
          if (this.people[i] === this.person) {
            this.person = ''
            return false
          }
        }
        this.people.push(this.person)
        this.person = ''
      }
    },
    delPerson (person) {
      for (var i = 0; i < this.people.length; i++) {
        if (this.people[i] === person) {
          this.people.splice(i, 1)
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

#people-field {
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
