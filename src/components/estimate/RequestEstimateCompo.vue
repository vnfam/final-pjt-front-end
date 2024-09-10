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
      :formData="formData" 
      @nextStep="nextStep" 
      @prevStep="prevStep" 
      @updateFormData="updateFormData">
    </router-view> 
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      step: 1, // 현재 스텝을 중앙에서 관리
      formData: {
        buildingType: '', // Step 1 데이터
        constructionType: [], // Step 2 데이터
        schedule: '', // Step 3 데이터
        budget: '', // Step 4 데이터
        address: '', // Step 5 데이터
        detailedAddress: '', // Step 5 상세 주소
        measureDate: '', // Step 5 실측 가능일
      },
      initialFormData: { // 초기 상태를 별도로 저장
        buildingType: '',
        constructionType: [],
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
      console.log(this.formData);
    },
    
    // // 모든 데이터를 Axios로 서버에 전송
    // async submitForm() {
    //   try {
    //     const response = await axios.post('/api/submit', this.formData);
    //     if (response.status === 200) {
    //       alert('견적 요청이 성공적으로 완료되었습니다.');
    //       this.$router.push('/'); // 요청 완료 후 메인 페이지로 이동
    //     } else {
    //       alert('서버 오류가 발생했습니다.');
    //     }
    //   } catch (error) {
    //     console.error('API 호출 중 에러:', error);
    //     alert('서버 통신 중 문제가 발생했습니다.');
    //   }
    // },

    // formData 초기화 및 stepOne으로 이동
    resetToStepOne() {
      this.step = 1;
      this.formData = { ...this.initialFormData }; // 초기화된 formData로 설정
      this.$router.push('/requestEstimate/stepOne'); // URL도 스텝 1로 변경
    },
  },

  mounted() {
    // 새로고침 시 stepOne으로 이동하고 데이터 초기화
    if (window.performance && performance.navigation.type === 1) {
      this.resetToStepOne();
    }
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
