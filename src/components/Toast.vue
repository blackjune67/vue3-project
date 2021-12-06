<template>
  <div>
    <div
      class="alert toas-box"
      :class="`alert-${type}`"
      role="alert"
      v-for="mValue in message"
      :key="mValue.idx"
    >
      {{ mValue.message }}
    </div>
  </div>
  <div></div>
  
</template>
<script>

export default {
  props: {
    message: {
      type: String,
      required: false,
    },
    type : {
      type: String,
      default: 'success'
    },
    isShow: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
  console.log('>> Toast.vue [isShow] : ' + JSON.stringify(props.isShow));
  

    return {
    };
  },
};
</script>

<style>
.toas-box {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
