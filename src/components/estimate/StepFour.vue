<template>
  <div class="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg">
    <!-- 프로그레스 바 -->
    <div class="w-full h-2 bg-gray-300 rounded-full mb-4">
      <div class="h-2 bg-primary rounded-full" :style="{ width: animatedProgressWidth + '%' }"></div>
    </div>

    <!-- 시공할 주소 입력 -->
    <h2 class="text-lg font-semibold mb-4">시공할 주소를 선택해주세요.</h2>
    <div class="space-y-3">
      <input
        type="text"
        placeholder="주소를 검색해주세요."
        class="w-full p-2 border rounded-md mb-3"
        v-model="address"
        readonly
      />
      <input
        type="text"
        placeholder="(선택) 지역과 상세주소를 입력해주세요."
        class="w-full p-2 border rounded-md"
        v-model="detailedAddress"
        ref="detailedAddress"
      />
      <button @click="searchAddress" class="p-2 bg-gray-600 text-white rounded-lg">주소 검색</button>
    </div>

    <!-- 실측 가능일 선택 -->
    <h2 class="text-lg font-semibold mt-6">실측 가능일을 선택해주세요. (선택사항)</h2>
    <input type="date" class="w-full p-2 border rounded-md" v-model="measureDate" :min="minDate" />

    <!-- 버튼 영역 -->
    <div class="mt-6 flex justify-between">
      <button @click="prevStep" class="w-24 py-2 bg-primary rounded-lg text-white" :disabled="step === 1">이전</button>

      <button
        @click="nextStep"
        :disabled="!address"
        class="w-24 py-2 rounded-lg text-white"
        :class="{
          'bg-gray-400 cursor-not-allowed': !address, // 비활성화 상태
          'bg-primary hover:bg-primary-dark cursor-pointer': address, // 활성화 상태
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
      address: '', // 주소
      detailedAddress: '', // 상세 주소 (선택)
      measureDate: '', // 실측 가능일 (선택)
      minDate: '', // 현재 날짜를 저장
      step: 4, // 현재 스텝
      animatedProgressWidth: '0', // 초기 프로그레스 바 너비
    };
  },
  computed: {
    progressWidth() {
      return (this.step / 5) * 100; // 전체 5단계 기준
    },
  },
  methods: {
    searchAddress() {
      this.openDaumPostcode();
    },
    openDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let addr = ''; // 주소 변수
          let extraAddr = ''; // 참고항목 변수

          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
            }
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
          }

          this.address = addr + extraAddr;

          this.$nextTick(() => {
            this.$refs.detailedAddress.focus(); // 검색 완료 후 상세 주소 필드에 focus
          });
        },
      }).open();
    },
    nextStep() {
      if (!this.address) {
        alert('주소를 입력해주세요.');
        return;
      }
      this.$router.push('/requestEstimate/stepFive'); // 다음 단계로 이동
    },
    prevStep() {
      this.$router.push('/requestEstimate/stepThree'); // 이전 단계로 이동
    },
  },
  mounted() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const dd = String(today.getDate()).padStart(2, '0'); // 오늘 날짜
    this.minDate = `${yyyy}-${mm}-${dd}`; // YYYY-MM-DD 형식으로 설정

    setTimeout(() => {
      this.animatedProgressWidth = this.progressWidth;
    }, 100);
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #0a3a5e;
}
div > div {
  transition: width 1s ease;
}
</style>
