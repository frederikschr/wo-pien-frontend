<template>
  <h1>Logout</h1>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    this.$store.state.user = null
    localStorage.removeItem('token')
    this.$router.push('/')
  }
}
</script>
