<template>
  <div v-if="company" class="mx-auto p-4">
    <!-- 업체 정보 -->
    <div class="flex items-center mb-6">
      <!-- 업체 로고 -->
      <div class="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden mr-4">
        <img
          v-if="company.companyLogoUrl"
          :src="company.companyLogoUrl"
          alt="Company Logo"
          class="object-cover w-full h-full"
        />
        <img v-else src="@/assets/logo.png" alt="Default Company Logo" class="object-cover w-full h-full" />
      </div>
      <!-- 업체 기본 정보 -->
      <div>
        <h2 class="text-2xl font-bold">{{ company.companyName }}</h2>
        <p class="text-gray-600">대표자: {{ company.owner }}</p>
        <p class="text-gray-600">사업자번호: {{ company.companyNumber }}</p>
        <p class="text-gray-600">개업일: {{ formatDate(company.publishDate) }}</p>
      </div>
    </div>

    <!-- 업체 설명 -->
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 class="text-xl font-semibold mb-2">업체 소개</h3>
      <p>{{ company.companyDesc }}</p>
    </div>

    <!-- 업체 서비스 -->
    <div class="bg-white p-4 rounded-lg mb-6">
      <h3 class="text-xl font-semibold mb-2">시공 서비스</h3>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="(service, index) in company.services"
          :key="index"
          class="bg-gray-100 text-sm px-3 py-1 rounded-full"
        >
          {{ service }}
        </li>
      </ul>
    </div>

    <!-- 업체 추가 정보 -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-xl font-semibold mb-2">기타 정보</h3>
      <p class="text-gray-600"><strong>주소:</strong> {{ company.address }}</p>
      <p class="text-gray-600"><strong>연락처:</strong> {{ formatPhoneNumber(company.phoneNumber) }}</p>
      <p class="text-gray-600"><strong>평점:</strong> {{ company.rating }} / 5.0</p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      company: null,
    };
  },
  mounted() {
    this.fetchCompany();
  },
  methods: {
    async fetchCompany() {
      const companyId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/company/${companyId}`);
        this.company = response.data;
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('ko-KR', options);
    },
    formatPhoneNumber(phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    },
  },
};
</script>
