<template>
  <div class="register">
  <h1>Register</h1>
    <form @submit.prevent="handleReg()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Enter username"/>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter email"/>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter password"/>
        </div>

        <button class="btn btn-primary btn-lock">Submit</button>
    </form>

  </div>
</template>

<script>
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
      const data = {
        username: this.name,
        email: this.email,
        password: this.password
      }

      // const response = await axios.post('login', data)
      console.log(data)

      // this.$store.dispatch('user', this.name)

      this.$router.push('/login')
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
