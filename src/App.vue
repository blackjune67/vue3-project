<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo"/>

    <div v-if="!todos.length">추가된 To-Do가 없습니다.</div>
    <TodoList :todos="todos" @toggle-todo='toggleTodo' @toggle-delete='deleteTodo'/>
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

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }




    return {
      todos,
      toggleTodo,
      deleteTodo,
      addTodo,
      TodoList
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
