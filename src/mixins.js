import axios from 'axios'

const session = {
  methods: {
    async getSession (inview, setMembers) {
      const app = this
      await axios.get('/session', {
        params: {
          id: this.$route.params.id
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        if (e.response.status === 401) {
          app.$store.dispatch('user', null)
          app.$router.push('/')
        } else {
          console.log(e)
        }
      }).then(function (response) {
        app.session = response.data.session
        app.del_items = []
        if (inview === true) {
          app.my_items = app.session.my_items
          for (var i = 0; i < app.my_items.length; i++) {
            app.my_items[i].already_existed = true
          }
        }
        if (setMembers === true) {
          app.members = []
          for (var x = 0; x < app.session.members.length; x++) {
            app.members.push(app.session.members[x].username)
          }
        }
      })
    }
  }
}

const people = {
  methods: {
    addPerson (target) {
      if (this.person !== '') {
        for (var i = 0; i < target.length; i++) {
          if (target[i].split(' ').join('') === this.person.split(' ').join('')) {
            this.person = ''
            return false
          }
        }
        target.push(this.person)
        this.person = ''
        var people = document.getElementById('people')
        if (people) {
          people.scrollTop = people.scrollHeight
        }
      }
    },
    delPerson (person, target) {
      for (var i = 0; i < target.length; i++) {
        if (target[i] === person) {
          target.splice(i, 1)
        }
      }
    }
  }
}

const item = {
  methods: {
    addItem (target) {
      if (this.item_name !== '' && this.item_amount > 0) {
        for (var i = 0; i < target.length; i++) {
          if (target[i].name.split(' ').join('') === this.item_name.split(' ').join('')) {
            this.item_name = ''
            return false
          }
        }
        var byHost = document.getElementById('flexCheckDefault')
        target.push({ name: this.item_name.trim(), amount: this.item_amount, byHost: byHost.checked })
        this.item_name = ''
        this.item_amount = 1
        byHost.checked = false
      }
    },
    delItem (item, target) {
      for (var i = 0; i < target.length; i++) {
        if (target[i] === item) {
          target.splice(i, 1)
          if (Object.prototype.hasOwnProperty.call(item, 'id')) {
            console.log(this.del_items)
            this.del_items.push(item)
          }
        }
      }
    }
  }
}

export { session, people, item }
