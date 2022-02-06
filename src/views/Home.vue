<template>
  <div class="home">
    <HelloWorld msg="Welcome to WoPien"/>
    <h3>The place where you can find locations to pien at</h3>

    <h1> {{ user }} </h1>

    <div class="directions">
      <button><router-link class="routers" to="login"> Login </router-link></button>
      <button><router-link class="routers" to="register"> Sign up </router-link></button>

    </div>

  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style>

.home {
  text-align: center;
  padding: 100px;
}

.home .directions {
  display: flex;
  justify-content: center;
  align-content: space-between;
}

.home .directions button{
  margin: 80px 50px;
  text-decoration: none;
  color: white;
}

.home .directions button:hover {
  background-color: rgba(0, 136, 169, 0.8);
}

.home .routers:hover {
    color: white;
}

 @media only screen and (max-width: 700px) {
   button {
     padding: 2px 30px;

   }
 }

</style>
