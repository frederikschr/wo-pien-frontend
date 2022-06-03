import axios from 'axios'

const session = {
  methods: {
    async getSession (inview, setMembers) {
      const app = this
      const response = await request.methods.fetchData('/session', {
        id: this.$route.params.id
      }, app)

      this.session = response.data.session
      this.del_items = []
      this.new_items = []
      if (inview === true) {
        this.my_items = this.session.my_items
        for (var i = 0; i < this.my_items.length; i++) {
          this.my_items[i].already_existed = true
        }
      }
      if (setMembers === true) {
        this.members = []
        for (var x = 0; x < this.session.members.length; x++) {
          this.members.push(this.session.members[x].username)
        }
      }
    }
  }
}

const people = {
  methods: {
    addPerson (target, member) {
      if (member !== '') {
        for (var i = 0; i < target.length; i++) {
          if (target[i].split(' ').join('') === member.split(' ').join('') || !(this.all_users.some(user => user === member))) {
            this.person = ''
            this.found_member = ''
            return false
          }
        }
        target.push(member)
        this.person = ''
        this.found_member = ''
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
    },
    findPerson (person) {
      if (person !== '') {
        for (var i = 0; i < this.all_users.length; i++) {
          if (this.all_users[i].includes(person) && this.all_users[i] !== this.user.username) {
            this.found_member = this.all_users[i]
            return
          }
        }
      }
      this.found_member = ''
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
        var byHostElmnt = document.getElementById('flexCheckDefault')
        var byHost = false
        if (byHostElmnt !== null) {
          byHostElmnt.checked = false
          if (byHost === true) {
            byHost = true
          }
        }
        target.push({ name: this.item_name.trim(), amount: this.item_amount, byHost: byHost })
        this.item_name = ''
        this.item_amount = 1
      }
    },
    delItem (item, target) {
      for (var i = 0; i < target.length; i++) {
        if (target[i] === item) {
          target.splice(i, 1)
          if (Object.prototype.hasOwnProperty.call(item, 'id')) {
            this.del_items.push(item)
          }
        }
      }
    }
  }
}

const request = {
  methods: {
    async fetchData (url, params, app) {
      const response = await axios.get(url, {
        params: params,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(function (e) {
        if (e.response != null) {
          if (e.response.status === 401) {
            app.$store.dispatch('user', null)
            app.$router.push('/')
          } else {
            app.$store.dispatch('flashed', { message: e.response.data.error, success: false })
          }
        } else {
          app.$store.dispatch('flashed', { message: 'Internal Server Error', success: false })
        }
      })
      return response
    },
    async postData (method, url, data, app) {
      const response = await axios[method](url, data,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }).catch(function (e) {
        if (e.response != null) {
          if (e.response.status === 401) {
            app.$store.dispatch('user', null)
            app.$router.push('/')
          } else {
            const error = Object.values(e.response.data)[0][0]
            app.$store.dispatch('flashed', { message: error, success: false })
          }
        } else {
          app.$store.dispatch('flashed', { message: 'Internal Server Error', success: false })
        }
      })
      return response
    }
  }
}

export { session, people, item, request }
