<template>
  <div class="register">
  <h1>Register</h1>
    <form @submit.prevent="handleReg()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" maxlength="20" v-model="name" placeholder="Enter username"/>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" maxlength="35" v-model="email" placeholder="Enter email"/>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" maxlength="20" v-model="password" placeholder="Enter password"/>
        </div>

        <button class="btn btn-primary btn-lock" id="form-button">Submit</button>
    </form>

  </div>
</template>

<script>
import { request } from '../mixins'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleReg () {
      const app = this
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      const response = await request.methods.postData('post', '/user', data, app)
      app.$store.dispatch('flashed', { message: response.data.message, success: true })
      app.$router.push('/login')
    }
  }
}
</script>

<style>

.register {
    width: 50%;
    margin: 5% auto;
}

.register h1 {
    text-align: center;
}

.register .form-group {
    margin-top: 30px;
}

.register button {
    margin-top: 4%;
}

@media only screen and (max-width: 700px) {
    .register {
        margin: 15% auto;
    }
}

</style>
