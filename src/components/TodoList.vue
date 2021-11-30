<template>
  <div v-for="(vTodo, index) in todos" :key="vTodo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input
          class="form-check-input"
          type="checkbox"
          :value="vTodo.completed"
          @change='toggleTodo(index)'
        />
        <!-- <label 
            class="form-check-label"
            :style="todo.completed ? todoStyle : {}"
          > -->
        <label class="form-check-label" :class="{ vTodo: vTodo.completed }">
          {{ vTodo.subject }}
        </label>
      </div>

      <div>
        <button class="btn btn-danger btn-sm" @click='deleteTodo(index)'>
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const toggleTodo = (index) => {
      emit('toggle-todo', index);
    };

    const deleteTodo = (index) => {
      emit('toggle-delete', index);
    };

    return {
      toggleTodo,
      deleteTodo,
    };
  },
};
</script>

<style></style>
