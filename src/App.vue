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

    <div v-if="!todos.length">추가된 To-Do가 없습니다.</div>

    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
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
        <div>
          <button 
          class="btn btn-danger btn-sm"
          @click="deleteTodo(index)"
          >삭제</button>
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

    const deleteTodo = (index) => {
      todos.value.splice(index, 1) //그 자리에 있는 인덱스 하나를 추출한다 (추출된 나머지가 표시.)
      //console.log(todos.value)
    }

/* A[0] B[1]
delete => 1 */

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
      deleteTodo
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
