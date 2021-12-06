<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'home' }"
    >민첩성 코딩캠퍼스
    </router-link
    >

    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item active">
        <router-link
            class="nav-link"
            :to="{ name: 'Todos' }"
        >Todos
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>