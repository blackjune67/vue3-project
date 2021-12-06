<template>
  <NavBar />
  <div class="container">
    <router-view/>
  </div>

  <Toast />
</template>

<script>
import Toast from '@/components/Toast.vue';
import NavBar from '@/components/Navbar.vue';

export default {
  components: {
    Toast,
    NavBar
  },
};
</script>

<style scoped>
</style>
