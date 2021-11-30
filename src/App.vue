<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo"/>

    <div v-if="!todos.length">추가된 To-Do가 없습니다.</div>
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    //component가 아닌 components,,, s 붙이셈..
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);

    /* const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    }; */

    const addTodo = (todo) => {
      //console.log(todo)
      todos.value.push(todo);
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1); //그 자리에 있는 인덱스 하나를 추출한다 (추출된 나머지가 표시.)
      //console.log(todos.value)
    };

    return {
      todos,
      //todoStyle,
      deleteTodo,
      addTodo,
      TodoList
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
