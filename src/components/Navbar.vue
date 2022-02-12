<template>
  <div class="app-default">
    <div class="nav-bar">

      <header>
              <h1>WOPIEN</h1>

              <nav>
                    <ul class="nav-links" id="nav-links">
                        <li v-if="user" @click="logout">Logout</li>
                        <li v-if="!user"><router-link class="routers" to="login">Login</router-link></li>
                        <li v-if="!user"><router-link class="routers" to="register">Sign up</router-link></li>
                        <li><router-link class="routers" to="/">Home</router-link></li>
                    </ul>

              </nav>
              <button>Contact</button>

              <div class="drop-down">
                <div @click="toggleMenu" class="container">
                  <div class="bar1"></div>
                  <div class="bar2"></div>
                  <div class="bar3"></div>
                </div>
              </div>

      </header>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    toggleMenu () {
      var menu = document.getElementById('nav-links')
      if (menu.style.maxHeight === '0px') {
        menu.style.maxHeight = '130px'
      } else {
        menu.style.maxHeight = '0px'
      }
    },
    logout () {
      this.$store.state.user = null
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style>
* {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

li, a, button, router-link {
    font-weight: 500;
    font-size: 16px;
    color: #edf0f1;
    text-decoration: none;
}

header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 30px 10%;
    height: 80px;
    background-color: #24252A;
}

.nav-links {
    list-style: none;
    top: 0px;
    max-height: none;
}

.nav-links li {
    display: inline-block;
    padding: 20px 30px;
    color: white;
    margin-top: 20px;
}

.nav-links li:hover {
   cursor: pointer;
   text-decoration: none;
 }

.routers {
    color: white;
}

.routers:hover {
    transition: .3s;
    color: rgba(0, 136, 169, 1);
}

.nav-bar h1 {
    color: white;
    margin-right: auto;
}

.container {
  display: inline-block;
  cursor: pointer;
}

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: rgb(255, 255, 255);
  margin: 6px 0;
  transition: 0.4s;
}

button {
    padding: 9px 25px;
    background-color: rgba(0, 136, 169, 1);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}

button:hover {
    background-color: rgba(0, 136, 169, 0.8);
}

.drop-down {
  display: none;
}

@media only screen and (max-width: 700px) {
    .nav-links {
      width: 100%;
      height: 9%;
      position: absolute;
      top: 80px;
      right: 0;
      z-index: 2;
      background-color: rgba(0, 136, 169, 0.8);
      transition: 1s;
    }
    .nav-links li{
        display: block;
        margin-top: 3%;
        float: right;
    }

    .nav-bar button {
      display: none;
    }

    .drop-down {
      display: block;
    }

}
</style>
