import { reactive, toRefs } from 'vue';

export const useCount = () => {
  const state = reactive({
    // eslint-disable-line no-unused-vars
    count: 0,
  });

  return toRefs(state);
};
