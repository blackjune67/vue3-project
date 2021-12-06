<template>
  <div v-for="(vTodo, index) in todos" :key="vTodo.id" class="card mt-2">
    <div
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(vTodo.id)"
    >
      <div class="flex-grow-1">
        <input
          class="me-md-1"
          type="checkbox"
          :checked="vTodo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <!-- <label 
            class="form-check-label"
            :style="todo.completed ? todoStyle : {}"
          > -->
        <span :class="{ vTodo: vTodo.completed }">
          {{ vTodo.subject }}
        </span>
      </div>

      <div>
        <button
          class="btn btn-danger btn-sm"
          @click.stop="openModal(vTodo.id)"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
  <Modal 
    v-if="showModal" 
    @close="closeModal"
    @delete="deleteTodo"
  />
  <!-- condition -->
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

export default {
  components: {
    Modal,
  },
  emits: ['toggle-todo', 'toggle-delete'],
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit('toggle-delete', todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value= null;
    };

    const moveToPage = (vTodoId) => {
      //router.push('/todos/' + vTodoId);
      router.push({
        name: 'Todo',
        params: {
          id: vTodoId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal
    };
  },
};
</script>

<style></style>
