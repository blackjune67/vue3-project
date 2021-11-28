<template>
    <div class="name">{{ greet }}</div>

</template>

<script>
export default {
  setup() {
    const name = "최하준1";

    const greeting = (name) => {
      return 'hello, ' + name;
    };

    const greet = greeting(name);
    

    return {
      greet
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>