<template>
  <div class="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
    <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
      <div 
        class="h-2 bg-primary rounded-full"
        :style="{ width: animatedProgressWidth + '%' }"
      ></div>
    </div>
    <h2 class="text-lg font-semibold mb-4">인테리어할 건물을 선택해주세요.</h2>
    <div class="space-y-3">
      <label class="flex items-center">
        <input type="radio" name="building" value="아파트" v-model="buildingType" class="mr-2">
        아파트
      </label>
      <label class="flex items-center">
        <input type="radio" name="building" value="빌라" v-model="buildingType" class="mr-2">
        빌라
      </label>
      <label class="flex items-center">
        <input type="radio" name="building" value="주택" v-model="buildingType" class="mr-2">
        주택
      </label>
      <label class="flex items-center">
        <input type="radio" name="building" value="오피스텔" v-model="buildingType" class="mr-2">
        오피스텔
      </label>
    </div>
    <div class="mt-6">
      <!-- 버튼 색상 및 비활성화 상태를 관리 -->
      <button 
        @click="nextStep" 
        :disabled="!buildingType"
        class="w-full py-2 rounded-lg text-white"
        :class="{
          'bg-gray-400 cursor-not-allowed': !buildingType, // 비활성화 상태
          'bg-primary hover:bg-primary-dark cursor-pointer': buildingType // 활성화 상태
        }"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buildingType: '',   // 선택된 건물 유형
      step: 1,            // 현재 스텝
      animatedProgressWidth: '0' // 초기 프로그레스 바 너비
    };
  },
  computed: {
    // 프로그레스 바의 너비
    progressWidth() {
      return (this.step / 5) * 100; // 전체 5단계 기준
    }
  },
  methods: {
    nextStep() {
      if (this.buildingType) {
        this.$router.push('/requestEstimate/stepTwo'); // 다음 단계로 이동
      }
    }
  },
  mounted() {
    // 프로그레스 바를 서서히 채우도록 설정
    setTimeout(() => {
      this.animatedProgressWidth = this.progressWidth;
    }, 100);
  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #0A3A5E; /* 활성화된 버튼 색상 */
}
.bg-primary-dark {
  background-color: #06263F; /* 활성화된 버튼 hover 색상 */
}
div > div {
  transition: width 1s ease; /* 1초 동안 서서히 채워지게 설정 */
}
</style>
