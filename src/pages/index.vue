<template>
  <div>Home Page</div>

  <div>
    <span>{{ timer }}</span>

     <button @click="restartFive()">Restart</button>
  </div>
</template>

<script>
import { useTimer } from 'vue-timer-hook';
import { watchEffect, onMounted } from 'vue';

export default {
  setup() {
    const time = new Date();
    console.log('>> ', time);
    time.setSeconds(time.getSeconds() + 600);
    console.log('>> : ' + time.setSeconds(time.getSeconds() + 600));
    const timer = useTimer(time);
    console.log('timer : ' + JSON.stringify(timer));

    const restartFive = () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 300);
      timer.restart(time);
    };

    onMounted(() => {
      watchEffect(async () => {
        if (timer.isExpired.value) {
          console.warn('에러 오냐?');
        }
      });
    });

    return {
        restartFive
    }
  },
};
</script>

<style></style>
