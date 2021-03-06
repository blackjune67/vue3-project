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
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
  components: {
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
    const { toastAlertType, showToast, toastMessage, triggerToast } = useToast();
    const toDoId = route.params.id;

    const getTodosDetail = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`todos/${toDoId}`);

        todo.value = { ...res.data }; //전개 연산자를 사용해서 깊은 복사를 함.
        originalTodo.value = { ...res.data };

        loading.value = false;
      } catch (err) {
        loading.value = false;
        console.log('err : ' + err);
        triggerToast('에러가 발생했습니다.🤢', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
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
        //const message = 'Successfully ' + (props.editing ? 'Updated!' : 'Created!');
        triggerToast(message);

        if(!props.editing) {
          router.push({
            name: 'Todos'
          })
        }
      } catch (err) {
        triggerToast('에러가 발생했습니다.🤢', 'danger');

        // setTimeout(() => {
        //   console.log('error : ' + err);
        // }, 2000);
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
      showToast,
      toastMessage,
      toastAlertType,
      subjectError,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
