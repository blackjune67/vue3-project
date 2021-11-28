<template>
    <div v-bind:class="nameClass">
      {{ name }}
    </div>
    <input
     v-bind:type="type"
     v-bind:value="name"
     >
    <button 
      class="btn btn-primary"
      v-on:click="updateName"
    >Click</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    //오브젝트나 배열은 reactive를 사용.
    /* const name2 = reactive({
      id : 1
    }) */

    let name = ref("최하준"); //숫자, string, object, 배열 다 들어가짐..
    let type = ref('number');
    let nameClass = ref('');

    const updateName = () => {
      name.value = '유단비';
      type.value = 'text';
      nameClass.value = 'name';
    }

    return {
      updateName,
      name,
      type,
      nameClass
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>