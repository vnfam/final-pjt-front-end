<template>
  <div>
    <h1>견적 요청</h1>
    <router-view :step="step" :progress-width="progressWidth" @nextStep="nextStep" @prevStep="prevStep"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1, // 현재 스텝을 중앙에서 관리
    };
  },
  // computed 캐싱 O
  computed: {
    // 프로그레스 바의 진행률 계산
    progressWidth() {
      return (this.step / 5) * 100;
    },
  },
  // methods 캐싱 x
  methods: {
    // 다음 스텝으로 이동
    nextStep() {
      if (this.step < 5) {
        this.step++;
      }
    },
    // 이전 스텝으로 이동
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
  },
};
</script>
