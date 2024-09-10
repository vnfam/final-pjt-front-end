<template>
  <div class="max-w-lg mx-auto bg-gray-100 rounded-lg">
    <h2 class="text-lg font-semibold mb-4">시공 분야를 선택해주세요.</h2>
    <div class="space-y-3">
      <label class="items-center">
        <input type="checkbox" name="selectAll" value="전체 선택" v-model="selectAll" @change="toggleSelectAll" class="mx-1">
        전체 선택
      </label>
      <div class="space-y-3">
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="창호/샷시" v-model="constructionType" class="mx-1">
          창호/샷시
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="도배/페인트" v-model="constructionType" class="mx-1">
          도배/페인트
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="욕실" v-model="constructionType" class="mx-1">
          욕실
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="주방" v-model="constructionType" class="mx-1">
          주방
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="장판" v-model="constructionType" class="mx-1">
          장판
        </label>
      </div>
      <div class="space-y-3">
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="마루" v-model="constructionType" class="mx-1">
          마루
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="전기/조명" v-model="constructionType" class="mx-1">
          전기/조명
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="필름" v-model="constructionType" class="mx-1">
          필름
        </label>
        <label class="items-center">
          <input type="checkbox" name="constructionType" value="중문/도어" v-model="constructionType" class="mx-1">
          중문/도어
        </label>
      </div>
    </div>

    <!-- 시공 종류를 선택하지 않았을 때 경고 메시지 -->
    <p v-if="!isValidSelection" class="text-red-500 mt-4">최소 한 개의 시공 종류를 선택해야 합니다.</p>

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
        :disabled="!isValidSelection"
        class="w-24 py-2 rounded-lg text-white"
        :class="{
          'bg-gray-400 cursor-not-allowed': !isValidSelection, // 비활성화 상태
          'bg-primary hover:bg-primary-dark cursor-pointer': isValidSelection // 활성화 상태
        }"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'step',
    'formData',
  ],

  data() {
    return {
      stepTwo: this.step,  // 현재 스텝
      constructionType: this.formData.constructionType || [], // 부모에서 받은 데이터로 초기화
      allOptions: ['창호/샷시', '도배/페인트', '욕실', '주방', '장판', '마루', '전기/조명', '필름', '중문/도어'], // 모든 옵션
      selectAll: this.formData.selectAll || false, // 부모에서 받은 전체 선택 상태 초기화
    };
  },

  computed: {
    // 최소 하나의 시공 종류가 선택되었는지 확인
    isValidSelection() {
      return this.constructionType.length > 0;
    },
  },

  watch: {
    constructionType: {
      handler(newVal) {
        // 모든 옵션이 선택되었을 경우 '전체 선택'도 true로 설정
        this.selectAll = newVal.length === this.allOptions.length;
      },
      deep: true,
    }
  },

  methods: {
    nextStep() {
      if (this.isValidSelection) {
        this.$emit('updateFormData', { 
          constructionType: this.constructionType, // 선택 데이터 부모에 전달
          selectAll: this.selectAll // 선택된 전체 선택 상태도 전달
        });
        this.$emit('nextStep');
        this.$router.push('/requestEstimate/stepThree'); // 다음 단계로 이동
      }
    },

    prevStep() {
      this.$emit('prevStep');
      this.$router.push('/requestEstimate/stepOne'); // 이전 단계로 이동
    },

    toggleSelectAll() {
      if (this.selectAll) {
        // 전체 선택 시 모든 옵션 추가
        this.constructionType = [...this.allOptions];
      } else {
        // 전체 선택 해제 시 모든 옵션 제거
        this.constructionType = [];
      }
    },
  },
  
  mounted() {
    // mounted 시 전체 선택 여부 체크
    this.selectAll = this.constructionType.length === this.allOptions.length;
  }
}
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