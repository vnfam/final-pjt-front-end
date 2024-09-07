<template>
  <div class="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
    <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
      <div 
        class="h-2 bg-primary rounded-full"
        :style="{ width: animatedProgressWidth + '%' }"
      ></div>
    </div>
    <h2 class="text-lg font-semibold mb-4">인테리어 예산을 선택해주세요.</h2>
    <div class="space-y-3">
      <label class="flex items-center">
        <input type="radio" name="budget" value="1천만원 미만" v-model="budget" class="mr-2">
        1천만원 미만
      </label>
      <label class="flex items-center">
        <input type="radio" name="budget" value="1천만원대" v-model="budget" class="mr-2">
        1천만원대
      </label>
      <label class="flex items-center">
        <input type="radio" name="budget" value="2천만원대" v-model="budget" class="mr-2">
        2천만원대
      </label>
      <label class="flex items-center">
        <input type="radio" name="budget" value="3천만원대" v-model="budget" class="mr-2">
        3천만원대
      </label>
      <label class="flex items-center">
        <input type="radio" name="budget" value="4천만원대" v-model="budget" class="mr-2">
        4천만원대
      </label>
      <label class="flex items-center">
        <input type="radio" name="budget" value="5천만원 이상" v-model="budget" class="mr-2">
        5천만원 이상
      </label>
      <label class="flex items-center">
        <input type="radio" name="budget" value="미정" v-model="budget" class="mr-2">
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
        :disabled="!budget"
        class="w-24 py-2 rounded-lg text-white"
        :class="{
          'bg-gray-400 cursor-not-allowed': !budget, // 비활성화 상태
          'bg-primary hover:bg-primary-dark cursor-pointer': budget // 활성화 상태
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
      budget: '',           // 선택된 예산
      step: 3,              // 현재 스텝
      animatedProgressWidth: '0' // 초기 프로그레스 바 너비
    };
  },
  computed: {
    progressWidth() {
      return (this.step / 5) * 100; // 전체 5단계 기준
    }
  },
  methods: {
    nextStep() {
      if (this.budget) {
        this.$router.push('/requestEstimate/stepFour'); // 다음 단계로 이동
      }
    },
    prevStep() {
      this.$router.push('/requestEstimate/stepTwo'); // 이전 단계로 이동
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
