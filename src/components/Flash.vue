<template>
  <div v-if="flashed" class="flash">
      <div v-if="flashed.success" class="alert alert-success" role="alert">
        {{ flashed.message }}
        <button @click="delFlash()" type="button" class="btn-close" aria-label="Close"></button>
      </div>

      <div v-else class="alert alert-danger" role="alert">
        {{ flashed.message }}
        <button @click="delFlash()" type="button" class="btn-close" aria-label="Close"></button>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Flash',
  methods: {
    delFlash () {
      this.$store.dispatch('flashed', null)
    }
  },
  computed: {
    ...mapGetters(['flashed'])
  }
}
</script>
<style>
.flash {
  height: 5em;
}

.flash button {
  float: right;
}

</style>
