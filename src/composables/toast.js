import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  const toastMessage = computed(() => store.state.toastMessageWithSmile);
  const toastAlertType = computed(() => store.state.toastAlertType);
  const showToast = computed(() => store.state.showToast);
  
  const triggerToast = (message, type = 'success') => {
    store.dispatch('triggerToast', message, type);
  };

  return {
    toastAlertType,
    showToast,
    toastMessage,
    triggerToast,
  };
};
