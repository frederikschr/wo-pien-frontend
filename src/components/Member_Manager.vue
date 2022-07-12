<template>
  <div class="form-group">
    <label>Members</label>
    <div class="input-group">
      <input type="text" v-model="person" @input="findPerson(this.person)" class="form-control" id="members-field" maxlength="20" placeholder="Enter username"/>
      <button type="button" @click="addPerson(this.target, this.person)" class="btn btn-primary btn-lock" style="background-color: rgba(0, 136, 169, 1); border: none;">Add</button>
    </div>

    <div class="find-member" v-if="found_member !== ''" style="height: 2em; margin-top: 1em;">
      <p>{{ found_member }}</p>
      <button class="add-person" @click="addPerson(this.target, this.found_member)"><i class="fa fa-plus" style="color: rgba(0, 136, 169, 1); float: right;"></i></button>
    </div><br>

    <b>Members</b>
    <div id="people" style="overflow-y: scroll; max-height:10em;">
      <div class="person" v-for="person in target" :key="person">
        {{ person }}
        <button class="del-person" v-if="person != this.user.username" @click="delPerson(person, this.target)"><i class="fa fa-close" style="color: red"></i></button>
      </div>
    </div>

    <label style="margin-top: 1em;">Groups</label>
    <div class="groups">
      <div class="group" v-for="group in groups" :key="group">
        <button class="add-group" @click="addGroup(group, this.target)">{{ group.name }}</button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { people } from '../mixins'

export default {
  name: 'MemberManager',
  mixins: [people],
  props: {
    target: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      person: '',
      found_member: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'all_users', 'groups'])
  }
}

</script>

<style>
#members-field {
  width: 50%;
}

.person {
  padding: 1em;
  height: 3em;
}

.del-person {
    cursor: pointer;
    color: red;
    background-color: white;
    float: right;
}

.add-person {
  cursor: pointer;
  color: rgba(0, 136, 169, 1);
  background-color: white;
  float: right;
}

</style>
