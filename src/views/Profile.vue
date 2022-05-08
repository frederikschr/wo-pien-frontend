<template>
  <div class="profile">
    <h1>Profile</h1><br>
    <form @submit="updateProfile()">

      <div class="avatar">
        <img :src="`${user.url}`" class="pic">
        <input type="file" name="file" accept=".png, .jpg, .jpeg" :maxFileSize="1000" ref="fileInput" @change="onAvatarUpload">
        <label for="imageUpload"></label>
      </div>

    </form>

  </div>

</template>

<script>
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
      user: { url: null }
    }
  },
  methods: {
    fetchProfile () {
      console.log('getting profile')
    },
    updateProfile () {
      console.log('updating')
    },
    onAvatarUpload (e) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      console.log(url)
      this.user.url = url
    }
  }
}

</script>

<style>
.profile {
  margin: 5% auto;
  width: 50%;
  text-align: center;
}

.avatar input {
  width: 50%;
}

.pic {
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
