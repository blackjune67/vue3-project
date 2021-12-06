import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']); 
  const toastAlertType = computed(() => store.state.toast.toastAlertType); //toast로 namespace를 지정했기 때문에 toast(name) 으로 접근.
  const showToast = computed(() => store.state.toast.showToast);
  
  const triggerToast = (message, type = 'success') => {
    store.dispatch('toast/triggerToast', message, type);
  };

  return {
    toastAlertType,
    showToast,
    toastMessage,
    triggerToast,
  };
};
