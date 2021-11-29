<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-gorw-1 mr-2">
          <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="To-Do 리스트를 적어주세요."
          />
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>

      <div v-show="hasError" style="color: red">할일이 없습니다.</div>
    </form>
    <div v-for="todo in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
          <input 
          class="form-check-input"
          type="checkbox"
          v-model="todo.completed">
          <!-- <label 
            class="form-check-label"
            :style="todo.completed ? todoStyle : {}"
          > -->
          <label 
            class="form-check-label"
            :class="{ todo: todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref('');
    const todos = ref([]);
    const hasError = ref(false);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false, //완료 여부
        });
        hasError.value = false;
        todo.value = '';
      }
    };


    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
    };
  },
};
</script>

<style>
.todo {
  text-decoration: line-through;
  color: gray;
}
</style>
