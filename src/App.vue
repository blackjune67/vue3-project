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
  <div class="container">
    <router-view />
  </div>
  <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType" 
  />
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast,
  },
  setup() {
    const { 
      toastAlertType,
      showToast,
      toastMessage, 
      triggerToast } = useToast();

    console.log('==> showToast : ' + showToast.value);

    return {
      toastAlertType,
      showToast,
      toastMessage,
      triggerToast,
    };
  },
};
</script>

<style>
.vTodo {
  text-decoration: line-through;
  color: gray;
}
</style>
