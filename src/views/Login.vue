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

        <button class="btn btn-primary btn-lock">Login</button>
    </form>

    </div>
</template>

<script>
// import axios from 'axios'

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
      const data = {
        username: this.name,
        password: this.password
      }

      // const response = await axios.post('login', data)
      console.log(data)

      // localStorage.setItem('token', respone.data.token)

      this.$store.dispatch('user', this.name)

      this.$router.push('/')
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
        margin: 25% auto;
    }
}

</style>
