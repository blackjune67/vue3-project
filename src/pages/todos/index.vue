<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
      >Create Todo</button>
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
    <div style="color: red">{{ error }}</div>

    <div v-if="!todos.length">검색 결과가 없습니다.</div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @toggle-delete="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(currentPage - 1)"
          >
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
            class="page-link"
            @click="getTodos(page)"
          >
            {{ page }}
          </a>
        </li>

        <li class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
// import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  components: {
    //component가 아닌 components,,, s 붙이셈..
    // TodoSimpleForm,
    TodoList,
    Toast,
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const { toastAlertType, showToast, toastMessage, triggerToast } =
      useToast();

    /*     
const toasTimeout = ref(null);
  const toastMessage = reactive([
      //배열로 보냄.
      {
        viewMessage: '',
        idx: null,
      },
    ]);
    const toastAlertType = ref('');
    const showToast = ref(false);
    const triggerToast = (message, type = 'success') => {
      toastMessage[0].viewMessage = message;
      toastAlertType.value = type;
      //toastMessage[0].idx = idx;
      // console.log('>> ' + JSON.stringify(toastMessage));
      // isShow.value = true;

      showToast.value = true;
      toasTimeout.value = setTimeout(() => {
        console.log('setTimeout!!');
        toastMessage[0].value = '';
        toastAlertType.value = '';
        showToast.value = false;
      }, 3000);
    }; */

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );

        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log('>>> error : ' + err);
        error.value = '어떤 에러가 발생했습니다.';
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      //데이터베이스 todo를 저장한다.
      try {
        console.log('==> addTodo : ' + todo);
        //post request요청 => response응답
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (err) {
        error.value = '어떤 에러가 발생했습니다.';
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;

      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          // completed: !todos.value[index].completed,
          completed: checked,
        });

        //console.log('>>> toggleTodo res : ', JSON.stringify(res));
        // todos.value[index].completed = !todos.value[index].completed;
        todos.value[index].completed = checked;
      } catch (err) {
        console.log('>>> toggleTodo error : ' + JSON.stringify(err));
      }
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;

      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        // console.log('>>> deleteTodo res : ' + JSON.stringify(res));
        getTodos(1);
        //todos.value.splice(index, 1);
      } catch (err) {
        console.log('>>> deleteTodo error : ' + JSON.stringify(err.data));
        error.value = '어떤 에러가 발생했습니다.';
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

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

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
      Toast,
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
