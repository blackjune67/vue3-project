<template>
    <div class="name">
      {{ name }}
    </div>
    <button 
      class="btn btn-primary"
      v-on:click="updateName"
    >Click</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let name = ref("최하준1");

    // const greeting = (name) => {
    //   return 'hello, ' + name;
    // };

    // const greet = greeting(name);

    const updateName = () => {
      name.value = '최하준';
      console.log(name);
    }

    return {
      updateName,
      name
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>