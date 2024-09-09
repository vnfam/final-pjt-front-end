<template>
  <div class="max-w-lg mx-auto bg-gray-100 rounded-lg">
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
      <button 
        @click="nextStep" 
        :disabled="!buildingType"
        class="w-full py-2 rounded-lg text-white"
        :class="{
          'bg-gray-400 cursor-not-allowed': !buildingType,
          'bg-primary hover:bg-primary-dark cursor-pointer': buildingType
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
  ],
  data() {
    return {
      buildingType: '', // 선택된 건물 유형
    };
  },
  methods: {
    nextStep() {
      if (this.buildingType) {
        this.$emit('nextStep');
        this.$router.push('/requestEstimate/stepTwo'); // 다음 스텝으로 이동
      }
    },
  },
  mounted() {
    
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
