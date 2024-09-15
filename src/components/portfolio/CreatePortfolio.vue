<template>
  <div class="w-full mx-auto">
    <p class="text-2xl font-semibold text-center pb-4">시공 사례 작성</p>

    <form
      @submit.prevent="insertPortfolio"
      class="w-[800px] mb-2 overflow-x-hidden overflow-y-scroll px-10 pt-2 pb-4 pb-20 mx-auto"
    >
      <div class="mb-[12px]">
        <label for="title" class="text-[14px] font-normal mb-4">제목</label>
        <div class="mt-2 flex justify-between items-center">
          <input
            v-model="title"
            class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
            type="text"
            placeholder="제목을 입력해주세요."
            required
          />
        </div>
      </div>

      <div class="mb-[12px]">
        <label for="content" class="text-[14px] font-normal mb-4">내용</label>
        <quill-editor v-model:value="content" :content="content" :options="editorOptions" class="custom-quill-editor" />
      </div>

      <div class="flex justify-between items-center mb-[12px]">
        <div class="w-[50%] pr-2">
          <label for="startDate" class="text-[14px] font-normal mb-4">시작날짜</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="startDate"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="date"
              required
            />
          </div>
        </div>
        <div class="w-[50%] pl-2">
          <label for="endDate" class="text-[14px] font-normal mb-4">종료날짜</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="endDate"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="date"
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-[12px] flex items-center justify-between">
        <div class="w-[50%] pr-2">
          <label for="projectArea" class="text-[14px] font-normal mb-4">면적</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="projectArea"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="시공 면적을 입력해주세요."
              required
            />
          </div>
        </div>

        <div class="w-[50%] pl-2">
          <label for="projectBudget" class="text-[14px] font-normal mb-4">예산</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="projectBudget"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="text"
              placeholder="예산을 입력해주세요."
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-[12px]">
        <label for="projectLocation" class="text-[14px] font-normal mb-4">시공지역</label>
        <div class="mt-2 flex justify-between items-center">
          <input
            v-model="projectLocation"
            class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
            type="text"
            placeholder="시공지역을 입력해주세요."
            required
          />
        </div>
      </div>

      <div class="mb-[12px]">
        <label for="buildingTypes" class="text-[14px] font-normal mb-4">건물 종류</label>
        <div class="mt-2 flex flex-wrap gap-2">
          <div v-for="type in buildingTypes" :key="type.id" class="flex items-center">
            <input type="radio" :value="type.id" v-model="selectedBuildingType" class="mr-2" />
            <span class="text-[14px]">{{ type.name }}</span>
          </div>
        </div>
      </div>

      <div class="mb-[12px]">
        <label for="constructionTypes" class="text-[14px] font-normal mb-4">시공 종류</label>
        <!-- 전체 선택 체크박스 -->
        <div class="mt-2 mb-3 flex items-center">
          <input type="checkbox" @change="toggleAllConstructionTypes" :checked="isAllSelected" class="mr-2" />
          <span class="text-[14px]">전체 선택</span>
        </div>
        <!-- 개별 시공 종류 체크박스 -->
        <div class="mt-2 flex flex-wrap gap-2">
          <div v-for="type in constructionTypes" :key="type.id" class="flex items-center">
            <input type="checkbox" :value="type.id" v-model="selectedTypes" class="mr-2" />
            <span class="text-[14px]">{{ type.name }}</span>
          </div>
        </div>
      </div>

      <button class="bg-midGreen text-white w-full h-[52px] mx-auto rounded-[4px] text-[16px] mt-[24px]" type="submit">
        작성하기
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      title: '',
      content: '',
      startDate: '',
      endDate: '',
      projectArea: '',
      projectLocation: '',
      projectBudget: '',
      constructionTypes: [],
      selectedTypes: [],
      buildingTypes: [],
      selectedBuildingType: '',
      editorOptions: {
        placeholder: '내용을 입력해주세요..',
        // modules: {
        //   toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
        // },
      },
    };
  },
  mounted() {
    this.getConstructionType();
    this.getBuildingType();
  },
  computed: {
    // 전체 선택 여부 계산
    isAllSelected() {
      return this.selectedTypes.length === this.constructionTypes.length;
    },
  },
  methods: {
    // 건물 종류 조회
    async getBuildingType() {
      try {
        const response = await axios.get('/api/buildingType');
        this.buildingTypes = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // 시공 종류 조회
    async getConstructionType() {
      try {
        const response = await axios.get('/api/constructionType');
        this.constructionTypes = response.data; // 시공 종류 데이터 저장
      } catch (error) {
        console.error(error);
      }
    },

    // 시공 종류 전체 선택/해제
    toggleAllConstructionTypes() {
      if (this.isAllSelected) {
        this.selectedTypes = [];
      } else {
        this.selectedTypes = this.constructionTypes.map((type) => type.id);
      }
    },

    // 시공 사례 작성
    async insertPortfolio() {
      const userStore = useUserStore();
      const token = userStore.accessToken;

      const portfolioRequest = {
        title: this.title,
        content: this.content,
        startDate: this.startDate,
        endDate: this.endDate,
        projectLocation: this.projectLocation,
        projectArea: this.projectArea,
        projectBudget: this.projectBudget,
        constructionService: this.selectedTypes,
        buildingTypeId: this.selectedBuildingType,
      };

      try {
        const response = await axios.post('/api/portfolio/create', portfolioRequest, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
        alert('시공 사례가 작성되었습니다.');
        const portfolioId = response.data;
        console.log(portfolioId);
      } catch (error) {
        console.error(error);
        alert('시공 사례 작성에 실패하였습니다.');
      }
    },
  },
};
</script>

<style>
.custom-quill-editor {
  height: 300px;
}

.ql-container {
  height: 100%;
}

.ql-editor {
  min-height: 200px;
  max-height: 500px;
  overflow-y: auto;
}
</style>
