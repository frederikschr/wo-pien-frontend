<template>
  <div class="create">
    <h1>Create dicke Piener session</h1>

     <form @submit.prevent="handleCreate()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" maxlength="20" placeholder="Enter name of session"/>
        </div>

        <div class="form-group" id="description">
            <label>Description</label>
            <textarea v-model="desciption" cols="20" rows="5" placeholder="Add description"></textarea>
        </div>
        <div class="form-group">
            <label>Address</label>
            <input type="text" class="form-control" v-model="address" maxlength="20" placeholder="Enter address"/>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" class="form-control" v-model="date" placeholder="Enter date" min="2022-03-01" max="2023-01-01"/>
        </div>

        <div class="form-group">
            <label>Time</label>
            <input type="time" class="form-control" v-model="date" placeholder="Enter date" min="2022-03-01" max="2023-01-01"/>
        </div>

        <div>
          <label>People</label>
          <div class="input-group">
            <input type="text" class="form-control" id="people-field"/>
            <button class="btn btn-primary btn-lock">Add</button>
          </div>
        </div>

        <button class="btn btn-primary btn-lock" id="submit">Create</button>

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
      address: '',
      date: ''
    }
  },
  created () {
    if (this.$store.state.user == null) {
      this.$router.push('/')
    }
  },
  methods: {
    handleCreate () {
      this.$store.dispatch('flashed', { message: 'Created', success: true })
    }
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

#submit {
  float: left;
  margin-top: 1em;
}

#people-field {
  width: 50%;
}

@media only screen and (max-width: 700px) {
    .create {
        margin: 25% auto;
    }
}

</style>
