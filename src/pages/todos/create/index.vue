<template>
  <h1>Create ToDo</h1>
  <TodoForm
    :editing="false"
  />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';

export default {
  components: {
    TodoForm,
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
