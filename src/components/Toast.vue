<template>
  <div>
    <div
      class="alert toas-box"
      :class="`alert-${type}`"
      role="alert"
      v-for="mValue in message"
      :key="mValue.idx"
    >
      <!-- {{ message.viewMessage }} -->
      {{ mValue.viewMessage }}
    </div>
  </div>
  <div></div>
  <!-- <div v-else>
    
    
  </div> -->
  <!-- {{ mValue }} -->
  <!-- <div :v-model="start"></div> -->
  <!-- <div>
    <span>{{ timer.days }}</span
    >:<span>{{ timer.hours }}</span
    >:<span>{{ timer.minutes }}</span
    >:<span>{{ timer.seconds }}</span>
  </div>
  <p>{{ timer.isRunning ? 'Running' : 'Not running' }}</p>
  <button @click="timer.start()">Start</button>
  <button @click="timer.pause()">Pause</button>
  <button @click="timer.resume()">Resume</button>
  <button @click="restartFive()">Restart</button> -->
</template>
<script>
// import { watch } from 'vue';
//import { useTimer } from 'vue-timer-hook';

export default {
  props: {
    message: {
      type: Array,
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
  // watch(() => props.message, () => {
  //   console.log('watch_1 >>>>> ' + props.message);
  //   console.log('watch_2 >>>>> ' + JSON.stringify(props.message.viewMessage));
  // })

    //const toastMessageCountDown
    /* 
      1. 변경되면 toastMessage => 정상적으로 저장되었습니다.
      2. Error message와 함께 countdown 실행 후 브라우저 종료.
    */
    /* const time = new Date();
    const timer = useTimer(time);
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    const restartFive = () => {
      // Restarts to 5 minutes timer
      const time = new Date();
      time.setSeconds(time.getSeconds() + 300);
      timer.restart(time);
    }; */

    /* onMounted(() => {
      watchEffect(async () => {
        if (timer.isExpired.value) {
          console.log('IsExpired');
        }
      });
    }); */

    return {
      // restartFive,
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
