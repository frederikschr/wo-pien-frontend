<template>
    <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLog()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Enter username"/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter password"/>
        </div>

        <button class="btn btn-primary btn-lock" id="form-button">Login</button>
    </form>

    </div>
</template>

<script>
import { request } from '../mixins'

export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    async handleLog () {
      if (this.name !== '' && this.password !== '') {
        const app = this
        const response = await request.methods.fetchData('/user', {
          name: this.name,
          password: this.password
        }, app)
        localStorage.setItem('token', response.data.token)
        app.$store.dispatch('user', response.data.user)
        app.$store.dispatch('flashed', { message: 'Logged in successfully', success: true })
        app.$store.dispatch('all_users', response.data.all_users)
        this.$router.push('/')
      }
    }
  }
}

</script>

<style>
.login {
    width: 50%;
    margin: 5% auto;
}

.login h1 {
    text-align: center;
}

.login .form-group {
    margin-top: 30px;
}

.login button {
    margin-top: 4%;
}

@media only screen and (max-width: 700px) {
    .login {
        margin: 15% auto;
    }
}

</style>
