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
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      <!-- : 바인딩을 넣어주지 않으면 값이 String으로 넣어짐. -->
      저장
    </button>
    <button class="btn btn-warning m-2" @click="moveToListPage">취소</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  <div id="june">june</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed, reactive, onUnmounted } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const showToast = ref(false);
    const isShow = ref(true);
    const timeOut = ref(null);
    //const toastMessage = ref([]);
    const toastMessage = reactive([
      //배열로 보냄.
      {
        viewMessage: '',
        idx: null,
      },
    ]);
    const toastAlertType = ref('');
    const toDoId = route.params.id;

    onUnmounted(() => {
      console.log('befor unmount');
      clearTimeout(timeOut.value);
    }); //컴포넌트를 빠져나가기 전에 메모리 누수가 발생되지 않게 onUnmounted를 사용한다.

    // console.log('route : ' + JSON.stringify(route));
    // console.log('router : ' + JSON.stringify(router));

    const getTodosDetail = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:3000/todos/` + route.params.id
          `http://localhost:3000/todos/${toDoId}`
        );

        todo.value = { ...res.data }; //전개 연산자를 사용해서 깊은 복사를 함.
        originalTodo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        console.log(error);
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    getTodosDetail();

    const triggerToast = (message, type = 'success') => {
      if (isShow.value === true) {
        toastMessage[0].viewMessage = message;
        toastAlertType.value = type;
        //toastMessage[0].idx = idx;
        // console.log('>> ' + JSON.stringify(toastMessage));
        // isShow.value = true;
      } else {
        console.log('failed');
      }

      showToast.value = true;
      timeOut.value = setTimeout(() => {
        console.log('setTimeout!!');
        toastMessage[0].value = '';
        toastAlertType.value = '';
        showToast.value = false;
      }, 3000);
    };

    const todoUpdated = computed(() => {
      // console.log('todoUpdated');
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
      try {
        const res = await axios.put(`http://localhost:3000/todos/${toDoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });

        originalTodo.value = { ...res.data };
        // isShow.value = true;
        triggerToast('저장했습니다.😘');
      } catch (err) {
        console.log(err);
        // isShow.value = false;
        triggerToast('에러가 발생했습니다.🤢', 'danger');

        setTimeout(() => {
          console.log('error setTimeout');
          // window.close();
        }, 2000);
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToListPage,
      // saveTodoDetail
      onSave,
      todoUpdated,
      Toast,
      showToast,
      toastMessage,
      toastAlertType,
    };
  },
};
</script>

<style></style>
