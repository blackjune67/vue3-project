<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'home' }"
      >민첩성 코딩캠퍼스</router-link
    >

    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <router-link
          class="nav-link active"
          aria-current="page"
          :to="{ name: 'Todos' }"
          >Todos</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {};
</script>

<style>
.vTodo {
  text-decoration: line-through;
  color: gray;
}
</style>
