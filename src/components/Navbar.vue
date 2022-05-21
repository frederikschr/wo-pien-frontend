<template>
  <div class="app-default">
    <div class="nav-bar">

      <header>
              <h1>WOPIEN</h1>
              <nav>
                <ul class="nav-links" id="nav-links">
                    <li v-if="user"><router-link class="routers-nav" id="logout" to="/logout" @click="logout()">Logout</router-link></li>
                    <li v-if="user"><router-link @click="toggleMenu()" class="routers-nav" to="/profile">Profile</router-link></li>
                    <li v-if="user"><router-link @click="toggleMenu()" class="routers-nav" to="/statistics">Statistics</router-link></li>
                    <li v-if="!user"><router-link @click="toggleMenu()" class="routers-nav" to="login">Login</router-link></li>
                    <li v-if="!user"><router-link @click="toggleMenu()" class="routers-nav" to="register">Signup</router-link></li>
                    <li><router-link @click="toggleMenu()" class="routers-nav" to="/">Home</router-link></li>
                    <li><router-link @click="toggleMenu()" class="routers-nav" to="/about">About</router-link></li>
                </ul>

              </nav>
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
  created () {
    this.$store.dispatch('user', null)
    localStorage.removeItem('token')
  },
  methods: {
    toggleMenu () {
      if (screen.width < 700) {
        var menu = document.getElementById('nav-links')
        var routers = document.getElementsByClassName('routers-nav')
        if (menu.style.maxHeight === '0px') {
          menu.style.maxHeight = '130px'
          for (var i = 0; i < routers.length; i++) {
            routers[i].style.display = 'block'
          }
        } else {
          menu.style.maxHeight = '0px'
          setTimeout(() => {
            for (var i = 0; i < routers.length; i++) {
              routers[i].style.display = 'none'
            }
          }, 400)
        }
        if (this.flashed) {
          this.$store.dispatch('flashed', null)
        }
      }
    },
    logout () {
      if (screen.width < 700) {
        this.toggleMenu()
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'flashed'])
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
    color: #ffffff;
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
    overflow: auto;
}

.nav-links li {
    display: inline-block;
    padding: 20px 30px;
    margin-top: 20px;
}

.routers-nav:hover, .router-link-active {
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

.nav-bar button:hover {
    background-color: rgba(0, 136, 169, 0.8);
}

.drop-down {
  display: none;
}

@media only screen and (max-width: 700px) {
    .nav-links {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      height: 80px;
      position: absolute;
      top: 80px;
      right: 0;
      z-index: 2;
      background-color: rgba(0, 136, 169, 0.8);
      transition: 1s;
    }

    .nav-links li {
        display: block;
        padding: 5%;
        margin-top: 3%;
        text-align: left;
    }

    .nav-links {
      max-height: 0px;
    }

    .routers-nav, #logout {
      display: none;
    }

    .drop-down {
      display: block;
    }

    .routers-nav:hover, .router-link-active {
      color: white;
    }
}
</style>
