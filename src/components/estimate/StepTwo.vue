<template>
  <div class="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
    <!-- 프로그레스 바 -->
    <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
      <div 
        class="h-2 bg-primary rounded-full"
        :style="{ width: animatedProgressWidth + '%' }"
      ></div>
    </div>

    <!-- 공사 예정일 선택 -->
    <h2 class="text-lg font-semibold mb-4">공사 예정일을 선택해주세요.</h2>
    <div class="space-y-3">
      <label class="flex items-center">
        <input type="radio" name="schedule" value="1개월 이내" v-model="schedule" class="mr-2">
        1개월 이내
      </label>
      <label class="flex items-center">
        <input type="radio" name="schedule" value="2개월 이내" v-model="schedule" class="mr-2">
        2개월 이내
      </label>
      <label class="flex items-center">
        <input type="radio" name="schedule" value="3개월 이내" v-model="schedule" class="mr-2">
        3개월 이내
      </label>
      <label class="flex items-center">
        <input type="radio" name="schedule" value="3개월 이후" v-model="schedule" class="mr-2">
        3개월 이후
      </label>
      <label class="flex items-center">
        <input type="radio" name="schedule" value="미정" v-model="schedule" class="mr-2">
        미정
      </label>
    </div>

    <!-- 이전/다음 버튼 -->
    <div class="mt-6 flex justify-between">
      <button 
        @click="prevStep"
        class="w-24 py-2 bg-primary rounded-lg text-white"
      >
        이전
      </button>

      <button 
        @click="nextStep" 
        :disabled="!schedule"
        class="w-24 py-2 rounded-lg text-white"
        :class="{
          'bg-gray-400 cursor-not-allowed': !schedule, // 비활성화 상태
          'bg-primary hover:bg-primary-dark cursor-pointer': schedule // 활성화 상태
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
      schedule: '',       // 선택된 공사 예정일
      step: 2,            // 현재 스텝
      animatedProgressWidth: '0' // 초기 프로그레스 바 너비
    };
  },
  computed: {
    progressWidth() {
      return (this.step / 5) * 100; // 5단계 중 2단계 기준
    }
  },
  methods: {
    nextStep() {
      if (this.schedule) {
        this.$router.push('/requestEstimate/stepThree'); // 다음 단계로 이동
      }
    },
    prevStep() {
      this.$router.push('/requestEstimate/stepOne'); // 이전 단계로 이동
    }
  },
  mounted() {
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
  transition: width 1s ease;
}
</style>
