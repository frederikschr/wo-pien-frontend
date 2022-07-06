<template>
  <div class="edit-session" v-motion :initial="{ opacity: 0}" :enter="{opacity: 1, transition: {type: 'spring', delay: 200, stiffness: 25}}">
    <button type="button" @click="returnToSession()" style="float:right;">Return</button><br><br><br>
    <h1>Edit Session</h1>
    <form @submit.prevent="commitChanges()">

      <div class="basic-data">
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
      </div><br>

      <Map :lat="session.coords.lat" :lng="session.coords.lng" /><br>

      <MemberManager :target="members" />

      <ItemManager :target="session.items" :delItems="del_items" />

      <button class="btn btn-primary btn-lock" id="form-button">Commit</button>
      <button type="button" class="btn btn-primary btn-lock" @click="delSession()" style="background: #F62020; margin: 2em; border: none;">Delete</button>

    </form><br>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { session, item, request } from '../mixins'
import axios from 'axios'
import MemberManager from '@/components/Member_Manager.vue'
import ItemManager from '@/components/Item_Manager.vue'
import Map from '@/components/Map.vue'

export default {
  name: 'Edit',
  mixins: [session, item],
  components: { MemberManager, ItemManager, Map },
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
      members: []
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
      const coords = await request.google.methods.getCoordsFromAddress(this.session.address)
      const data = {
        ids: { session_id: this.session.id },
        address: this.session.address,
        date: this.session.date,
        time: this.session.time,
        members: this.members,
        items: this.session.items,
        del_items: this.del_items,
        coords: coords
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
