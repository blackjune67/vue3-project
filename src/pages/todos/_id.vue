<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">로딩중..</div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>이름</label>
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
              @click='toggleTodoStatus'
            >
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <br />
    <button type="submit" class="btn btn-primary">저장</button>
    <button 
      class="btn btn-warning m-2"
      @click="moveToListPage"
    >취소</button>
  </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loading = ref(true);

    console.log('route : ' + JSON.stringify(route));
    console.log('router : ' + JSON.stringify(router));

    const getTodosDetail = async () => {
      const res = await axios.get(
        `http://localhost:3000/todos/` + route.params.id
      );
      todo.value = res.data;
      loading.value = false;
    };

    const toggleTodoStatus = () => {
      // console.log('>>>>>>>>  '  + todo.value.completed);
      todo.value.completed = !todo.value.completed;
    };

    const moveToListPage = () => {
        router.push({
          name: 'Todos'
        })
    }

    getTodosDetail();
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToListPage,
    };
  },
};
</script>

<style></style>
