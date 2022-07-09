<template>
  <div class="create">
    <h1>Create dicke Piener session</h1>

     <form @submit.prevent="handleCreate()">

        <div class="basic-data" v-motion :initial="{ y: 100, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: {type: 'spring', delay: 200, stiffness: 25}}">

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

        </div>

        <MemberManager :target="members" v-motion :initial="{ x: 50, opacity: 0 }" :visibleOnce="{ x: 0, opacity: 1, transition: { type: 'spring', delay: 200, stiffness: 25}}" />

        <ItemManager :target="items" v-motion :initial="{ x: -50, opacity: 0 }" :visibleOnce="{ x: 0, opacity: 1, transition: { type: 'spring', delay: 200, stiffness: 25}}" /><br>

        <button class="btn btn-primary btn-lock" id="form-button">Create</button>

    </form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { item, request } from '../mixins'
import MemberManager from '@/components/Member_Manager.vue'
import ItemManager from '@/components/Item_Manager.vue'

export default {
  name: 'Create',
  mixins: [item],
  components: { MemberManager, ItemManager },
  data () {
    return {
      name: '',
      desciption: '',
      address: '',
      date: '',
      time: '',
      members: [],
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
      const coords = await request.google.methods.getCoordsFromAddress(this.address)
      if (this.name !== '' && this.address !== '' && this.date !== '' && this.time !== '' && this.members.length > 1) {
        const app = this
        const data = {
          name: this.name,
          description: this.desciption,
          address: this.address,
          date: this.date,
          time: this.time,
          members: this.members,
          items: this.items,
          coords: coords
        }
        const reponse = await request.methods.postData('post', '/session', data, app)
        if (typeof reponse !== 'undefined') {
          app.$store.dispatch('flashed', { message: 'Successfully created ' + app.name, success: true })
          app.$router.push('/')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

.group {
  display: inline-block;
  margin-right: 1em;
}

.add-group {
  padding: .7em 0.6em;
  font-size: .9em;
  margin-top: 1em;
}

@media only screen and (max-width: 700px) {
    .create {
        margin: 15% auto;
        width: 75%;
    }
}

</style>
