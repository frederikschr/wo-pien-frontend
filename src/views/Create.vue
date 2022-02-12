<template>
  <div class="create">
    <h1>Create dicke Piener session</h1>

     <form @submit.prevent="handleLog()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Enter name of the piener session"/>
        </div>
        <div class="form-group">
            <label>Address</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter address"/>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-control" v-model="password" placeholder="Enter date"/>
        </div>
        <button class="btn btn-primary btn-lock">Login</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'Create',
  created () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.create {
  width: 50%;
  margin: 5% auto;
  margin-top: 100px;
}

.create h1 {
  text-align: center;
}

.create form {
  padding: 2em 0;
}

.create button {
  float: left;
  margin-top: 1em;
}

@media only screen and (max-width: 700px) {
    .create {
        margin: 25% auto;
    }
}

</style>
