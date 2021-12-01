<template>
  <div v-for="(vTodo, index) in todos" :key="vTodo.id" class="card mt-2">
    <div 
      class="card-body p-2 d-flex align-items-center"
      @click="moveToPage(vTodo.id)"
    >
      <div class="form-check flex-grow-1">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="vTodo.completed"
          @change="toggleTodo(index)"
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
        <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  emits: ['toggle-todo', 'toggle-delete'],
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    const toggleTodo = (index) => {
      emit('toggle-todo', index);
    };

    const deleteTodo = (index) => {
      emit('toggle-delete', index);
    };

    const moveToPage = (vTodoId) => {
      console.log('>> ' + vTodoId);
      //router.push('/todos/' + vTodoId);
      router.push({
          name: 'Todo',
          params: {
            id: vTodoId
          }
      });
    }

    return {
      toggleTodo,
      deleteTodo,
      moveToPage
    };
  },
};
</script>

<style></style>
