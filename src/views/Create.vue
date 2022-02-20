<template>
  <div class="create">
    <h1>Create dicke Piener session</h1>

     <form @submit.prevent="handleLog()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" maxlength="20" placeholder="Enter name of the piener session"/>
        </div>

        <div class="form-group" id="description">
            <label>Description</label>
            <textarea cols="20" rows="5"></textarea>
            <input type="text" class="form-control" v-model="description" maxlength="100" cols="2" rows="5" placeholder="Enter name of the piener session"/>
        </div>
        <div class="form-group">
            <label>Address</label>
            <input type="password" class="form-control" v-model="password" maxlength="20" placeholder="Enter address"/>
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
  data () {
    return {
      name: '',
      desciption: '',
      Address: '',
      Date: ''
    }
  },
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

#description .form-control {
  padding-bottom: 2em;
  height: 6em;
}

@media only screen and (max-width: 700px) {
    .create {
        margin: 25% auto;
    }
}

</style>
