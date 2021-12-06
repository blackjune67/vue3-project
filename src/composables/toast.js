import { ref, reactive, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export const useToast = () => {
  const router = useRouter();
  //const route = useRoute();
  const timeOut = ref(null);
  const toastAlertType = ref('');
  const showToast = ref(false);
  //const toDoId = route.params.id;
  const toastMessage = reactive([
    //배열로 보냄.
    {
      viewMessage: '',
      idx: null,
    },
  ]);

  const triggerToast = (message, type = 'success') => {
    toastMessage[0].viewMessage = message;
    toastAlertType.value = type;

    showToast.value = true;
    timeOut.value = setTimeout(() => {
      console.log('setTimeout!!');
      toastMessage[0].value = '';
      toastAlertType.value = '';
      showToast.value = false;

      router.push({
        // path: `/todos/${toDoId}`,
        path: '/todos' //이동할 경로.
      })
    }, 2000);
  };

  onUnmounted(() => {
    clearTimeout(timeOut.value);
  }); //컴포넌트를 빠져나가기 전에 메모리 누수가 발생되지 않게 onUnmounted를 사용한다.

  return {
    toastAlertType,
    showToast,
    toastMessage,
    triggerToast,
  };
};
