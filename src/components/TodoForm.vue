<template>
  <div v-if="loading">로딩중..</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <Input
          label="Subject"
          v-model:subject="todo.subject"
          :error="subjectError"
        />
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
          <textarea
            v-model="todo.body"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>

    <br />
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      <!-- : 바인딩을 넣어주지 않으면 값이 String으로 넣어짐. -->
      {{ editing ? '저장' : '생성' }}
    </button>
    <button class="btn btn-warning m-2" @click="moveToListPage">취소</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
  components: {
    Toast,
    Input,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  // directives: {
  //   focus: {
  //     mounted(el) {
  //       el.focus();
  //     },
  //   },
  // },
  setup(props) {
    
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });

    const subjectError = ref('');
    const originalTodo = ref(null);
    const loading = ref(false);
    const toDoId = route.params.id;
    const { toastAlertType, showToast, toastMessage, triggerToast } =
      useToast();

    // const updateTodoSubject = (newValue) => {
    //   console.log(todo.value.subject);
    //   todo.value.subject = newValue;
    // }

    const getTodosDetail = async () => {
      loading.value = true;

      try {
        const res = await axios.get(
          // `http://localhost:3000/todos/` + route.params.id
          `todos/${toDoId}`
        );

        todo.value = { ...res.data }; //전개 연산자를 사용해서 깊은 복사를 함.
        originalTodo.value = { ...res.data };

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

    const onSave = async () => {
      subjectError.value = '';
      if (!todo.value.subject) {
        subjectError.value = '제목은 필수입니다.😓';
        return;
      }

      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };

        if (props.editing === true) {
          /**
           * update로직
           */
          res = await axios.put(`todos/${toDoId}`, data);
          originalTodo.value = { ...res.data };
        } else {
          
          res = await axios.post('todos', data);
          todo.value.subject = '';
          todo.value.body = '';
        }

        // isShow.value = true;
        const message = (props.editing ? '수정' : '저장') + '했습니다.😘';
        triggerToast(message);

        if(!props.editing) {
          router.push({
            name: 'Todos'
          })
        }
      } catch (err) {
        triggerToast('에러가 발생했습니다.🤢', 'danger');

        setTimeout(() => {
          console.log('error : ' + err);
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
      subjectError,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
