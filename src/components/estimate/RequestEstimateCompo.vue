<template>
  <div>
    <h1>견적 요청</h1>
    <div class="max-w-xl mx-auto bg-gray-100 p-8 rounded-lg">
      <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
        <div class="h-2 bg-primary rounded-full" :style="{ width: progressWidth + '%' }"></div>
      </div>
      <router-view
        :step="step"
        :progress-width="progressWidth"
        :formData="formData"
        @nextStep="nextStep"
        @prevStep="prevStep"
        @updateFormData="updateFormData"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1, // 현재 스텝을 중앙에서 관리
      estimateRequestId: null, // 새로운 필드로 견적 요청 ID 관리
      formData: {
        buildingTypeId: '', // Step 1 데이터
        floor: '',
        constructionTypeIds: [], // Step 2 데이터
        schedule: '', // Step 3 데이터
        budget: '', // Step 4 데이터
        address: '', // Step 5 데이터
        detailedAddress: '', // Step 5 상세 주소
        measureDate: '', // Step 5 실측 가능일
      },
      initialFormData: {
        // 초기 상태를 별도로 저장
        buildingTypeId: '',
        floor: '',
        constructionTypeIds: [],
        schedule: '',
        budget: '',
        address: '',
        detailedAddress: '',
        measureDate: '',
      },
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

    // 자식 컴포넌트에서 전달된 데이터를 업데이트
    updateFormData(newData) {
      this.formData = { ...this.formData, ...newData };
    },

    // formData 초기화 및 stepOne으로 이동
    resetToStepOne() {
      this.step = 1;
      this.formData = { ...this.initialFormData }; // 초기화된 formData로 설정
      this.$router.push('/requestEstimate/stepOne'); // URL도 스텝 1로 변경
    },
  },

  mounted() {
    // 최신 표준을 사용해 새로고침을 감지
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      this.resetToStepOne(); // 새로고침 시 stepOne으로 이동 및 데이터 초기화
    }
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #0a3a5e;
}
.bg-primary-dark {
  background-color: #06263f;
}
div > div {
  transition: width 1s ease;
}
</style>
