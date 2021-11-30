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
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
          v-if="currentPage !== 1"
          class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage -1)">
            Previous
          </a>
        </li>

        <li 
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
          >
          <a 
            v-if="numberOfPages !== currentPage"
            class="page-link" @click="getTodos(page)">
            {{ page }}
          </a>
        </li>

        <li class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage +1)">Next</a>
        </li>
      </ul>
    </nav>
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
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    })

    /* const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    }; */

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);

        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log('>>> erro : ' + err)
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
        console.log('>>> error : ' + JSON.stringify(err.data))
        error.value = '어떤 에러가 발생했습니다.';
      }
    };

    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;

      try {
        const res = await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });

        console.log('>>> res : ', JSON.stringify(res));
        todos.value[index].completed = !todos.value[index].completed;
      } catch(err) {
        console.log('>>> error : ' + JSON.stringify(err));
      }
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;

      try {
        const res = await axios.delete('http://localhost:3000/todos/' + id);
        
        console.log('>>> res : ' + JSON.stringify(res))
        todos.value.splice(index, 1);
      } catch(err) {
          console.log('>>> error : ' + JSON.stringify(err.data))
          error.value = '어떤 에러가 발생했습니다.';
      }
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
      error,
      numberOfPages,
      currentPage,
      getTodos
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
