<template>
  <div v-for="(vTodo, index) in todos" :key="vTodo.id" class="card mt-2">
    <div 
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(vTodo.id)"
    >
      <div class="flex-grow-1">
        <input class="ml-2 mr-2"
          type="checkbox"
          :checked="vTodo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <!-- <label 
            class="form-check-label"
            :style="todo.completed ? todoStyle : {}"
          > -->
        <span :class="{ vTodo: vTodo.completed }">
          {{ vTodo.subject }}
        </span>
      </div>

      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
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

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit('toggle-delete', index);
    };

    const moveToPage = (vTodoId) => {
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
