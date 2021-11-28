<template>
    <div class="name">
      {{ name2 }}
    </div>
    <button 
      class="btn btn-primary"
      v-on:click="updateName"
    >Click</button>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    //오브젝트나 배열은 reactive를 사용.
    const name2 = reactive({
      id : 1
    })

    let name = ref("최하준1"); //숫자, string, object, 배열 다 들어가짐..

    // const greeting = (name) => {
    //   return 'hello, ' + name;
    // };

    // const greet = greeting(name);

    // const updateName = () => {
    //   name.value = '최하준';
    //   console.log(name);
    // }

    //ref = .value를 사용해야함.
    //reactive를 사용하면 value대신 오브젝트나 Array에 key값을 갖고 사용 가능.
    const updateName = () => {
      name2.id = 2;
      console.log(name2);
    }

    return {
      updateName,
      name,
      name2
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>