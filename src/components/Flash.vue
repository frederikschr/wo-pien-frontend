<template>
  <div class="wrapper">
    <transition name="flashed">
    <div v-if="flashed" class="flash">
        <div @click="delFlash()" v-if="flashed.success" class="alert alert-success" role="alert">
          {{ flashed.message }}
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div @click="delFlash()" v-else class="alert alert-danger" role="alert">
          {{ flashed.message }}
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
    </div>
    </transition>
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
.wrapper {
  height: 4em;
}

.flash button {
  float: right;
}

.flashed-enter-active, .flashed-leave-active {
  transition: opacity .5s;
}

.flashed-enter-from, .flashed-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 700px) {
  .btn-close {
    display: none
  }
}
</style>
