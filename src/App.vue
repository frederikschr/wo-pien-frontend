<template>
  <Navbar/>
  <Flash/>

  <router-view/>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Flash from '@/components/Flash.vue'

export default {
  components: {
    Navbar,
    Flash
  }
}
</script>
