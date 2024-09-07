<template>
  <div class="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
    <!-- 프로그레스 바 -->
    <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
      <div 
        class="h-2 bg-primary rounded-full"
        :style="{ width: animatedProgressWidth + '%' }"
      ></div>
    </div>
    <h2 class="text-lg font-semibold mb-4">이름과 연락처를 입력해주세요.</h2>

    <!-- 이름 입력 -->
    <input type="text" placeholder="이름을 입력해주세요." class="w-full p-2 border rounded-md mb-3" v-model="name">

    <!-- 연락처 입력 -->
    <div class="flex space-x-2 mb-3">
      <input type="text" placeholder="숫자만 입력해주세요." class="flex-1 p-2 border rounded-md" v-model="contact">
      <button @click="verifyContact" class="p-2 bg-gray-600 text-white rounded-lg">인증</button>
    </div>

    <!-- 동의사항 -->
    <div class="space-y-3">
      <label class="flex items-center">
        <input type="checkbox" id="agreeAll" v-model="agreeAll" @change="toggleAll" class="mr-2">
        전체 동의
      </label>
      <label class="flex items-center">
        <input type="checkbox" id="agreePrivacy" v-model="agreePrivacy" class="mr-2">
        (필수) 개인정보 수집 및 이용에 동의
      </label>
      <label class="flex items-center">
        <input type="checkbox" id="agreeMarketing" v-model="agreeMarketing" class="mr-2">
        (선택) 인테리어 정보 및 마케팅 수신에 동의
      </label>
    </div>

    <!-- 이전/완료 버튼 -->
    <div class="mt-6 flex justify-between">
      <button 
        @click="prevStep"
        class="w-24 py-2 bg-primary rounded-lg text-white"
      >
        이전
      </button>

      <button @click="submitForm" class="w-24 py-2 bg-primary rounded-lg text-white">
        완료
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      contact: '',
      agreeAll: false,
      agreePrivacy: false,
      agreeMarketing: false,
      step: 5,              // 현재 스텝
      animatedProgressWidth: '0' // 초기 프로그레스 바 너비
    };
  },
  computed: {
    progressWidth() {
      return (this.step / 5) * 100;
    }
  },
  methods: {
    toggleAll() {
      const value = this.agreeAll;
      this.agreePrivacy = value;
      this.agreeMarketing = value;
    },
    verifyContact() {
      alert('연락처 인증 기능을 구현하세요.');
    },
    submitForm() {
      if (!this.agreePrivacy) {
        alert('개인정보 수집 및 이용에 동의해주세요.');
        return;
      }
      alert('견적 요청이 완료되었습니다.');
      this.$router.push('/'); // 완료 후 홈으로 이동
    },
    prevStep() {
      this.$router.push('/requestEstimate/stepFour'); // 이전 단계로 이동
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
  background-color: #0A3A5E;
}
div > div {
  transition: width 1s ease;
}
</style>
