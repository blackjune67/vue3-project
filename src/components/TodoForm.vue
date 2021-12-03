<template>
  <div v-if="loading">로딩중..</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>제목</label>
          <input
              type="text"
              class="form-control"
              id="focus"
              v-model="todo.subject"
              v-focus="directives"
          />
          <div
              v-if="subjectError"
              class="text-red"
          >
            {{ subjectError }}
          </div>
        </div>
      </div>
      <div v-if="editing" class="col-6">
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

      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>

    <br/>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      <!-- : 바인딩을 넣어주지 않으면 값이 String으로 넣어짐. -->
      {{ editing ? '저장' : '생성' }}
    </button>
    <button class="btn btn-warning m-2" @click="moveToListPage">취소</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref, computed} from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/toast';

export default {
  components: {
    Toast,
  },
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      }
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: ''
    });
    const subjectError = ref('');
    const originalTodo = ref(null);
    const loading = ref(false);
    const toDoId = route.params.id;
    const {toastAlertType, showToast, toastMessage, triggerToast} = useToast();

    const getTodosDetail = async () => {
      loading.value = true;

      try {
        const res = await axios.get(
            // `http://localhost:3000/todos/` + route.params.id
            `http://localhost:3000/todos/${toDoId}`
        );

        todo.value = {...res.data}; //전개 연산자를 사용해서 깊은 복사를 함.
        originalTodo.value = {...res.data};

        loading.value = false;
      } catch (err) {
        loading.value = false;
        triggerToast('에러가 발생했습니다.🤢', 'danger');
        console.log('err : ' + err);
      }
    };

    const todoUpdated = computed(() => {
      // console.log('todoUpdated');
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      console.log('>> toggleTodoStatus: ' + todo.value.completed);
      todo.value.completed = !todo.value.completed;
    };

    const moveToListPage = () => {
      router.push({
        name: 'Todos',
      });
    };


    /**
     * true면 TodoList를 불러온다.
     */
    if (props.editing === true) {
      getTodosDetail();
    }

    /* const saveTodoDetail = async () => {
       const res = axios.put('http://localhost:3000/todos/' + route.params.id, {
         subject: todo.value.subject,
         completed: todo.value.completed
       })
       console.log('==> save : ' + res);
    } */

    const onSave = async () => {
      subjectError.value = '';
      if (!todo.value.subject) {
        subjectError.value = '제목은 필수입니다.😓'
        return;
      }


      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        const message = (props.editing ? '수정' : '저장') + '했습니다.😘'

        if (props.editing === true) {
          /**
           * update로직
           */
          res = await axios.put(`http://localhost:3000/todos/${toDoId}`, data);
          originalTodo.value = {...res.data};
        } else {
          res = await axios.post(`http://localhost:3000/todos`, data);
          //originalTodo.value = { ...res.data };
          todo.value.subject = '';
          todo.value.body = '';
        }

        // isShow.value = true;
        triggerToast(message);
      } catch (err) {
        // isShow.value = false;
        triggerToast('에러가 발생했습니다.🤢', 'danger');

        setTimeout(() => {
          console.log('error : ' + err);
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
      subjectError
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>