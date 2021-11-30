<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-gorw-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="To-Do 리스트를 적어주세요."
        />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>

    <div v-show="hasError" style="color: red">할일이 없습니다.</div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  emmit: ['add-todo'],
  components: {},
  setup(props, { emit }) {
    const todo = ref("");
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false, //체크박스 완료 여부 false: 체크헤제, true: 체크.
        }); //이벤트 이름을 전달.

        hasError.value = false;
        todo.value = "";
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style></style>
