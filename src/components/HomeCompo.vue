<template>
  <div>
    <!-- 검색 카테고리 -->
    <div class="w-[1100px] w-max-[1100px] py-2 flex items-center justify-between bg-white fixed top-[80px] z-50">
      <div class="flex items-center justify-start">
        <!-- 지역 선택 -->
        <category-compo @region-selected="onRegionSelected" ref="categoryCompo" class="mr-3" />
        <!-- 시공 서비스 선택 (select box 형태) -->
        <construction-category-compo
          @services-selected="onServicesSelected"
          :selectedServicesProp="selectedServices"
          ref="constructionCompo"
        />
      </div>

      <!-- 카테고리 초기화 버튼 -->
      <button @click="resetAllSelections" class="bg-gray-400 text-white text-[12px] font-medium px-3 py-2 rounded">
        <font-awesome-icon :icon="['fas', 'arrow-rotate-left']" /> 선택 초기화
      </button>
    </div>

    <!-- 배너 및 타이틀 -->
    <banner-compo></banner-compo>

    <div class="py-8">
      <p class="text-[22px] font-bold text-[#1d1d1d] leading-[22px] tracking-[-0.3px] mb-2 flex items-center">
        리모델링 파트너
      </p>
      <div class="flex items-center">
        <font-awesome-icon class="w-4 h-4 mt-[2px] mr-[4px] text-[#555]" :icon="['fas', 'circle-info']" />
        <span class="text-[14px] font-normal text-[#555] leading-[20px] tracking-[-0.3px]">
          선택한 지역 및 서비스에 맞는 리모델링 업체를 보여드립니다.
        </span>
      </div>
    </div>

    <!-- 업체 리스트 -->
    <div class="w-full flex flex-col gap-[40px] pb-[40px]">
      <!-- Premium 업체 -->
      <div v-if="sortedCompanies.PREMIUM.length > 0">
        <!-- <div class="text-[16px] font-bold text-gray-600">광고</div> -->
        <div class="flex flex-wrap gap-[20px]">
          <company-card
            v-for="company in sortedCompanies.PREMIUM"
            :key="company.id"
            :company="company"
            :isPremium="true"
          ></company-card>
        </div>
      </div>

      <!-- Basic, No 업체 섞여서 표시 -->
      <div v-if="mixedBasicNoCompanies.length > 0">
        <div class="flex flex-wrap gap-[20px]">
          <company-card
            v-for="company in mixedBasicNoCompanies"
            :key="company.id"
            :company="company"
            :isPremium="false"
          ></company-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CategoryCompo from './common/RegionCategoryCompo.vue';
import ConstructionCategoryCompo from './common/ConstructionCategoryCompo.vue';
import BannerCompo from './company/BannerCompo.vue';
import CompanyCard from './company/CompanyCard.vue';

export default {
  components: { CategoryCompo, ConstructionCategoryCompo, BannerCompo, CompanyCard },
  data() {
    return {
      companies: [], // 전체 업체 데이터를 저장할 변수
      sortedCompanies: {
        PREMIUM: [],
        BASIC: [],
        NO: [],
      }, // 정렬된 업체 데이터를 저장할 변수
      mixedBasicNoCompanies: [], // BASIC과 NO를 합친 배열
      selectedRegion: null, // 선택된 지역 저장
      selectedServices: [], // 선택된 시공 서비스 저장
    };
  },
  methods: {
    // 선택된 지역 및 서비스에 맞는 업체 데이터를 불러오는 함수
    async fetchCompanies() {
      try {
        let url = '/api/company/list2';

        const params = [];

        // 지역 선택이 된 경우
        if (this.selectedRegion) {
          const { city, district } = this.selectedRegion;

          // district가 없을 경우 city만 사용하여 필터링
          if (district) {
            params.push(`city=${city}&district=${district}`);
          } else {
            params.push(`city=${city}`);
          }
        }

        // 선택된 서비스가 있는 경우
        if (this.selectedServices.length > 0) {
          params.push(`services=${this.selectedServices.join(',')}`);
        }

        // 파라미터가 있으면 URL에 추가
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        const response = await axios.get(url);
        this.companies = response.data;
        this.sortCompanies();
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching company data: ', error);
      }
    },

    // 업체 데이터를 Premium과 Basic, No로 나누고, Basic과 No는 섞어서 표시
    sortCompanies() {
      this.sortedCompanies.PREMIUM = this.companies.PREMIUM || [];
      this.sortedCompanies.BASIC = this.companies.BASIC || [];
      this.sortedCompanies.NO = this.companies.NO || [];

      // BASIC과 NO 등급 업체들을 하나의 배열로 합쳐서 관리
      this.mixedBasicNoCompanies = [...this.sortedCompanies.BASIC, ...this.sortedCompanies.NO];
    },

    // 지역 선택 시 호출
    onRegionSelected(region) {
      this.selectedRegion = region;
      console.log(this.selectedRegion);
      this.fetchCompanies(); // 선택된 지역을 기반으로 업체 데이터 조회
    },

    // 시공 서비스 선택 시 호출
    onServicesSelected({ services }) {
      this.selectedServices = services;
      this.fetchCompanies(); // 선택된 시공 서비스 기반으로 업체 데이터 조회
    },

    // 카테고리 전체 초기화
    resetAllSelections() {
      this.selectedRegion = null;
      this.selectedServices = [];
      this.$refs.categoryCompo.resetSelection(); // 지역 초기화
      this.$refs.constructionCompo.resetSelection(); // 시공 서비스 초기화
      this.fetchCompanies(); // 전체 업체 목록 조회
    },
  },
};
</script>

<style></style>
