<template>
  <!-- <div v-for="(vTodo, index) in todos" :key="vTodo.id" class="card mt-2"> -->
    <List
      :items="todos"
    >
    <!-- <template #default="slotProps"> 구조분해가 가능하다. -->
    <template #default="{ item, index }"> <!-- 구조분해가 가능하다. -->
    <div
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(item.id)"
    >
      <div class="flex-grow-1">
        <input
          class="me-md-1"
          type="checkbox"
          :checked="item.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <!-- <label 
            class="form-check-label"
            :style="todo.completed ? todoStyle : {}"
          > -->
        <span :class="{ vTodo: item.completed }">
          {{ item.subject }}
        </span>
      </div>

      <div>
        <button 
          class="btn btn-danger btn-sm" 
          @click.stop="openModal(item.id)"
        >
          삭제
        </button>
      </div>
    </div>
  </template>
</List>
  <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo">
      <!-- <template v-slot:title>
        Delte Todo!!
      </template>
      <template v-slot:body>
        삭제하시겠습니까?
      </template>
      <template v-slot:footer>
        <button>hello?</button>
      </template> -->
    </Modal>
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { ref } from 'vue';
import List from '@/components/List.vue';


export default {
  components: {
    Modal,
    List
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
      console.log('>>>>>>>>>>> : ' + id);
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      console.log('deleteTodo');
      emit('toggle-delete', todoDeleteId.value);
      
      showModal.value = false;
      todoDeleteId.value = null;
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
      closeModal,
    };
  },
};
</script>

<style></style>
