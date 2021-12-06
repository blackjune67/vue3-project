<template>
  <div>HOME</div>
  <div>{{ count }}</div>
  <button
    @click="count++"
  >ADD</button>
</template>

<script>
import { useCount } from '@/composables/count';
export default {
  setup() {
    const { count } = useCount();

    return { count };
  },
};
</script>

<style></style>
