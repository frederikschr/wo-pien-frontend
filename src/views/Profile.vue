<template>
  <div class="profile">
    <h1>Profile</h1><br>
    <form @submit.prevent="updateProfile()">

      <div class="avatar">
        <img id="avatar" :src="`data:image/png;base64, ${user_profile.avatar}`" @click="openUpload">
        <input id="avatar-input" type="file" name="file" accept=".png, .jpg, .jpeg" :maxFileSize="1000" ref="file" @change="uploadAvatar" style="display: none;">
        <label for="imageUpload"></label>
      </div><br>

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="user_profile.username" maxlength="20">
      </div><br>

      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="user_profile.email" maxlength="35">
      </div><br>

      <div class="form-group">
        <label>Prommile record</label>
        <input type="number" class="form-control" v-model="user_profile.promille_record" step="any">
      </div><br>

      <button class="btn btn-primary btn-lock">Update</button>

    </form><br>

    <div class="statistics">
      <h2>Statistics</h2>
      <label>Sessions attendet</label>
      <p>{{ user.sessions_attendet }}</p>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  created () {
    if (this.user === null) {
      this.$router.push('/')
    } else { this.fetchProfile() }
  },
  computed: {
    ...mapGetters(['user', 'sessions'])
  },
  data () {
    return {
      user_profile: null
    }
  },
  methods: {
    async fetchProfile () {
      const app = this
      await axios.get('/profile', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => { app.user_profile = response.data.user })
    },
    async updateProfile () {
      const app = this
      await axios.post('/profile', {
        username: this.user_profile.username,
        email: this.user_profile.email,
        promille_record: this.user_profile.promille_record
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        if (e.response.status === 401) {
          app.$store.dispatch('user', null)
          app.$router.push('/')
        } else {
          const error = Object.values(e.response.data)[0][0]
          app.$store.dispatch('flashed', { message: error, success: false })
        }
      }).then(function (response) {
        app.fetchProfile()
        app.$store.dispatch('flashed', { message: response.data.message, success: true })
      }).finally(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    },
    async uploadAvatar () {
      if (this.$refs.file.files.length !== 0) {
        const formData = new FormData()
        formData.append('file', this.$refs.file.files[0])
        await axios.post('/avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        ).then(() => this.fetchProfile())
      }
    },
    openUpload () {
      const avatarInput = document.getElementById('avatar-input')
      avatarInput.click()
    }
  }
}

</script>

<style>
.profile {
  margin: 5% auto;
  width: 50%;
}

.profile h1, .profile .avatar {
  text-align: center;
}

.avatar input {
  width: 50%;
}

#avatar {
  border-radius: 50%;
  height: 10em;
  width: 10em;
}

@media only screen and (max-width: 700px) {
    .profile {
        margin: 25% auto;
        width: 75%;
    }
}

</style>
