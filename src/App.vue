<template>
  <Navbar/>
  <Flash/>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-new */

import Navbar from '@/components/Navbar.vue'
import Flash from '@/components/Flash.vue'

export default {
  components: {
    Navbar,
    Flash
  }
}
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-out;
}

#form-button {
  background-color: rgba(0, 136, 169, 1);
  border: none;
}

</style>
