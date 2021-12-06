<template>
  <Modal>
    <template #title>삭제 Todo</template>
    <template #body> 삭제하시겠습니까? </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="onClose">
        Close
      </button>
      <button type="button" class="btn btn-danger" @click="onDelete">
        삭제
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { getCurrentInstance } from 'vue';

export default {
  components: {
    Modal,
  },
  setup() {
    const { emit } = getCurrentInstance();
    const onClose = () => {
      emit('close');
    };

    const onDelete = () => {
      emit('delete');
    };

    return {
      onClose,
      onDelete,
    }
  }
}
</script>

<style>
</style>
