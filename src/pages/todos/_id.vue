<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">로딩중..</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>제목</label>
          <input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>상태</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <br />
    <button 
      type="submit"
      class="btn btn-primary"
      :disabled="!todoUpdated"
      > <!-- : 바인딩을 넣어주지 않으면 값이 String으로 넣어짐. -->
      저장
    </button>
    <button class="btn btn-warning m-2" @click="moveToListPage">취소</button>
  </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const toDoId = route.params.id;

    // console.log('route : ' + JSON.stringify(route));
    // console.log('router : ' + JSON.stringify(router));

    const getTodosDetail = async () => {
      const res = await axios.get(
        // `http://localhost:3000/todos/` + route.params.id
        `http://localhost:3000/todos/${toDoId}`
      );

      todo.value = { ...res.data }; //전개 연산자를 사용해서 깊은 복사를 함.
      originalTodo.value = { ...res.data };

      loading.value = false;
    };

    const todoUpdated = computed(() => {
      console.log('todoUpdated');
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      // console.log('>>>>>>>>  '  + todo.value.completed);
      todo.value.completed = !todo.value.completed;
    };

    const moveToListPage = () => {
      router.push({
        name: 'Todos',
      });
    };

    /* const saveTodoDetail = async () => {
       const res = axios.put('http://localhost:3000/todos/' + route.params.id, {
         subject: todo.value.subject,
         completed: todo.value.completed
       })
       console.log('==> save : ' + res);
    } */

    const onSave = async () => {
      const res = await axios.put(`http://localhost:3000/todos/${toDoId}`, {
        subject: todo.value.subject,
        completed: todo.value.completed,
      });

      originalTodo.value = { ...res.data};
      console.log('==> save : ' + JSON.stringify(res));
    };

    getTodosDetail();
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToListPage,
      // saveTodoDetail
      onSave,
      todoUpdated
    };
  },
};
</script>

<style></style>
