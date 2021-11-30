<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm 
      @add-todo="addTodo"
    />

    <div v-if="!todos.length">추가된 To-Do가 없습니다.</div>
    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          />
          <!-- <label 
            class="form-check-label"
            :style="todo.completed ? todoStyle : {}"
          > -->
          <label class="form-check-label" :class="{ todo: todo.completed }">
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";

export default {
  components: {
    //component가 아닌 components,,, s 붙이셈..
    TodoSimpleForm,
  },
  setup() {
    const todos = ref([]);

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const addTodo = (todo) => {
      //console.log(todo)
      todos.value.push(todo);
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1); //그 자리에 있는 인덱스 하나를 추출한다 (추출된 나머지가 표시.)
      //console.log(todos.value)
    };

    /* A[0] B[1]
delete => 1 */

    return {
      todos,
      todoStyle,
      deleteTodo,
      addTodo
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
