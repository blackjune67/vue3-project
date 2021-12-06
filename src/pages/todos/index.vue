<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
      >Todo 작성하기</button>
    </div>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
      @keyup.enter="searchTodo"
    />
    <hr />

    <!-- <TodoSimpleForm @add-todo="addTodo" /> -->
<!--    <div style="color: red">{{ error }}</div>-->

    <div v-if="!todos.length">검색 결과가 없습니다.</div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @toggle-delete="deleteTodo"
    />
    <hr />
    <Pagination
        v-if="todos.length"
        :numberOfPages="numberOfPages"
        :currentPage="currentPage"
        @click="getTodos"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import axios from '@/axios';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    //component가 아닌 components,,, s 붙이셈..
    // TodoSimpleForm,
    TodoList,
    Pagination
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });
    const { toastAlertType, showToast, toastMessage, triggerToast } = useToast();
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );

        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log('>>> error : ' + err);
        error.value = '어떤 에러가 발생했습니다.';
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      //데이터베이스 todo를 저장한다.
      error.value = '';
      try {
        //post request요청 => response응답
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (err) {
        console.log(err)
        error.value = '어떤 에러가 발생했습니다.';
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;

      try {
        await axios.patch('todos/' + id, {
          // completed: !todos.value[index].completed,
          completed: checked,
        });

        //console.log('>>> toggleTodo res : ', JSON.stringify(res));
        // todos.value[index].completed = !todos.value[index].completed;
        todos.value[index].completed = checked;
      } catch (err) {
        console.log('>>> toggleTodo error : ' + JSON.stringify(err));
        error.value = 'Something went wrong.';
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    const deleteTodo = async (id) => {
      error.value = '';
      // const id = todos.value[index].id;

      try {
         await axios.delete('todos/' + id);
        // console.log('>>> deleteTodo res : ' + JSON.stringify(res));
        getTodos(1);
        //todos.value.splice(index, 1);
      } catch (err) {
        error.value = '어떤 에러가 발생했습니다.';
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate'
      }) 
    }

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // console.log(searchText.value);
        getTodos(1); //항상 첫번째 페이지를 보기 위해 1을 넣음.
      }, 1000);
    });
    // const filteredTodos = computed(() => {
    //   if(searchText.value) {
    //     return todos.value.filter(resultTodo => {
    //       return resultTodo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    return {
      todos,
      toggleTodo,
      deleteTodo,
      addTodo,
      TodoList,
      searchText,
      // filteredTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage
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
