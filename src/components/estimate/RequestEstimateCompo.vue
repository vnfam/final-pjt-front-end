<template>
  <div>
    <h1>견적 요청</h1>
    <div class="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
      <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
        <div 
          class="h-2 bg-primary rounded-full"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    <router-view 
      :step="step" 
      :progress-width="progressWidth" 
      @nextStep="nextStep" 
      @prevStep="prevStep">
    </router-view> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1, // 현재 스텝을 중앙에서 관리
    };
  },
  computed: {
    // 프로그레스 바의 진행률 계산
    progressWidth() {
      return (this.step / 5) * 100; // 총 5단계 중 현재 스텝에 맞춰 진행률 계산
    },
  },
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

<style scoped>
.bg-primary {
  background-color: #0A3A5E;
}
.bg-primary-dark {
  background-color: #06263F;
}
div > div {
  transition: width 1s ease;
}
</style>
