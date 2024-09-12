<template>
  <div class="max-w-lg mx-auto bg-gray-100 rounded-lg">
    <h2 class="text-lg font-semibold mb-4">인테리어할 건물을 선택해주세요.</h2>
    <!-- 개별 시공 종류 체크박스 -->
    <div class="mt-2 my-5">
      <div v-for="type in buildingTypes" :key="type.id" class="flex items-center">
        <input type="radio" :value="type.id" v-model="buildingType" class="mr-2" />
        <p>{{ type.name }}</p>
      </div>
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
import axios from 'axios';

export default {
  props: [
    'step',
    'formData',
  ],
  data() {
    return {
      buildingType: this.formData.buildingType || '', // 부모에서 받은 데이터로 초기화
      buildingTypes: [],  // 서버에서 가져온 건물 유형을 저장할 배열
    };
  },
  methods: {
    async getBuildingTypes() {
      try {
        const response = await axios.get('/api/buildingType');
        this.buildingTypes = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    nextStep() {
      if (this.buildingType) {
        this.$emit('updateFormData', { buildingType: this.buildingType });
        this.$emit('nextStep');
        this.$router.push('/requestEstimate/stepTwo'); // 다음 스텝으로 이동
        console.log(this.buildingType);
      }
    },
  },
  mounted() {
    this.getBuildingTypes();  // 컴포넌트가 마운트될 때 건물 유형 데이터 가져오기
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
