import axios from 'axios'

const session = {
  methods: {
    async getSession (inview, setMembers) {
      const app = this
      const response = await request.methods.fetchData('/session', {
        id: this.$route.params.id
      }, app)
      try {
        app.session = response.data.session
        app.del_items = []
        app.new_items = []
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
      } catch {
        app.$router.push('/')
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
    addGroup (group, members) {
      for (var i = 0; i < group.members.length; i++) {
        if (!members.includes(group.members[i])) {
          members.push(group.members[i])
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
          if (this.all_users[i].toLowerCase().includes(person.toLowerCase()) && this.all_users[i] !== this.user.username) {
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
          if (byHostElmnt.checked === true) {
            byHost = true
          }
          byHostElmnt.checked = false
        }
        target.push({ name: this.item_name.trim(), amount: this.item_amount, byHost: byHost })
        this.item_name = ''
        this.item_amount = 1
      }
    },
    delItem (item, target, delItems) {
      for (var i = 0; i < target.length; i++) {
        if (target[i] === item) {
          target.splice(i, 1)
          if (Object.prototype.hasOwnProperty.call(item, 'id')) {
            delItems.push(item)
          }
        }
      }
    }
  }
}

const error = {
  methods: {
    handleFlashExecption (e, app) {
      console.log(e.response.data)
      if (e.response != null) {
        if (e.response.status === 401) {
          app.$store.dispatch('user', null)
          app.$router.push('/')
        } else {
          if (Object.hasOwnProperty.call(e.response.data, 'error')) {
            app.$store.dispatch('flashed', { message: e.response.data.error, success: false })
          } else {
            const error = Object.values(e.response.data)[0][0]
            app.$store.dispatch('flashed', { message: error, success: false })
          }
        }
      } else {
        app.$store.dispatch('flashed', { message: 'Internal Server Error', success: false })
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
      }).catch(e => error.methods.handleFlashExecption(e, app))
      return response
    },
    async postData (method, url, data, app) {
      const response = await axios[method](url, data,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }).catch(e => error.methods.handleFlashExecption(e, app))
      return response
    },
    async deleteData (url, data, app) {
      await axios.delete(url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data: data
      }).catch(e => error.methods.handleFlashExecption(e, app))
        .then(function (response) {
          app.$store.dispatch('flashed', { message: response.data.message, success: true })
          app.$router.push('/')
        })
    }
  },
  google: {
    methods: {
      async getCoordsFromAddress (address) {
        const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY
        const URL = 'https://maps.googleapis.com/maps/api/geocode/json'
        const params = { address: address, key: API_KEY }
        const response = await axios.get(URL, {
          params: params
        })
        const coords = response.data.results[0].geometry.location
        return coords
      }
    }
  }
}

export { session, people, item, request }
