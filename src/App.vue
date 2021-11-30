<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
    />
    <hr/>

    <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color: red">{{ error }}</div>

    <div v-if="!filteredTodos.length">
      검색 결과가 없습니다.
    </div>

    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo='toggleTodo' 
      @toggle-delete='deleteTodo'/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    //component가 아닌 components,,, s 붙이셈..
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([]);
    const error = ref('');

    /* const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    }; */

    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        // todos.value.push(res.data);
        todos.value = res.data;
      } catch (err) {
        console.log(err)
        error.value = '어떤 에러가 발생했습니다.';
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      //데이터베이스 todo를 저장한다.
      try {
      //post request요청 => response응답
      const res = await axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed
      });
        todos.value.push(res.data);
      } catch(err) {
        console.log('실패, ERROR : ' + JSON.stringify(err.data))
        error.value = '어떤 에러가 발생했습니다.';
      }
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todos.value.filter(resultTodo => {
          return resultTodo.subject.includes(searchText.value);
        });
      } 

      return todos.value;
    });

    return {
      todos,
      toggleTodo,
      deleteTodo,
      addTodo,
      TodoList,
      searchText,
      filteredTodos,
      error
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
