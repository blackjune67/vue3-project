<template>
  <Modal>
    <template v-slot:title> Delte Todo</template>
    <template v-slot:body> 삭제하시겠습니까? </template>
    <template v-slot:footer>
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

export default {
  components: {
    Modal,
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('close');
    };

    const onDelete = () => {
      emit('delete');
    };

    return {
      onClose,
      onDelete,
    };
  },
};
</script>

<style></style>
