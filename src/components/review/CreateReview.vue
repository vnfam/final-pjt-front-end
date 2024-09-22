<template>
  <div class="w-full mx-auto px-6 py-8">
    <p class="text-2xl font-semibold text-center pb-6">시공 후기 작성</p>

    <form
      @submit.prevent="insertReview"
      class="max-w-[720px] mx-auto bg-white p-6 border-[1px] border-gray-300 rounded-lg"
    >
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium mb-2">제목</label>
        <input
          v-model="title"
          class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
          type="text"
          placeholder="제목을 입력해주세요."
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label for="companyName" class="block text-sm font-medium mb-2">업체명</label>
          <input
            v-model="companyName"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
            type="text"
            placeholder="업체명을 입력해주세요."
            required
          />
        </div>
        <div>
          <label for="rating" class="block text-sm font-medium mb-2">별점</label>
          <input
            v-model="rating"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
            type="number"
            placeholder="별점을 입력해주세요."
            min="1"
            max="5"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label for="startDate" class="block text-sm font-medium mb-2">시작날짜</label>
          <input
            v-model="startDate"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
            type="date"
            :max="today"
            required
          />
        </div>
        <div>
          <label for="endDate" class="block text-sm font-medium mb-2">종료날짜</label>
          <input
            v-model="endDate"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
            type="date"
            :min="startDate"
            :max="today"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label for="floor" class="block text-sm font-medium mb-2">면적 (평수)</label>
          <input
            v-model="floor"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
            type="number"
            placeholder="시공 면적을 입력해주세요."
            required
          />
        </div>
        <div>
          <label for="totalPrice" class="block text-sm font-medium mb-2">시공 금액 (만원)</label>
          <input
            v-model="totalPrice"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
            type="number"
            placeholder="시공 금액을 입력해주세요."
            required
          />
        </div>
      </div>

      <div class="mb-6">
        <label for="buildingTypes" class="block text-sm font-medium mb-2">건물 종류</label>
        <div class="flex flex-wrap gap-2">
          <div v-for="type in buildingTypes" :key="type.id" class="flex items-center">
            <input
              type="radio"
              :value="type.id"
              v-model="selectedBuildingType"
              class="mr-2 accent-midGreen text-midGreen"
            />
            <span class="text-sm">{{ type.name }}</span>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <label for="constructionTypes" class="block text-sm font-medium mb-2">시공 종류</label>
        <div class="flex flex-wrap gap-2">
          <div v-for="type in constructionTypes" :key="type.id" class="flex items-center">
            <input
              type="checkbox"
              :value="type.id"
              v-model="selectedTypes"
              class="mr-2 accent-midGreen text-midGreen"
            />
            <span class="text-sm">{{ type.name }}</span>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <label for="content" class="block text-sm font-medium mb-2">내용</label>
        <QuillEditor ref="quillEditor" v-model:modelValue="content" required />
      </div>

      <button class="bg-midGreen text-white w-full h-[44px] rounded text-[16px] font-medium mt-6" type="submit">
        작성하기
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import QuillEditor from '@/components/common/QuillEditor.vue';

export default {
  components: { QuillEditor },
  data() {
    return {
      title: '',
      content: '',
      startDate: '',
      endDate: '',
      floor: '',
      totalPrice: '',
      companyName: '',
      rating: '',
      buildingTypes: [],
      selectedBuildingType: '',
      constructionTypes: [],
      selectedTypes: [],
      today: '',
    };
  },
  mounted() {
    const today = new Date().toISOString().split('T')[0];
    this.today = today;

    this.getConstructionType();
    this.getBuildingType();
  },
  methods: {
    async getBuildingType() {
      try {
        const response = await axios.get('/api/buildingType');
        this.buildingTypes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getConstructionType() {
      try {
        const response = await axios.get('/api/constructionType');
        this.constructionTypes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async insertReview() {
      const userStore = useUserStore();
      const token = userStore.accessToken;

      const reviewRequest = {
        title: this.title,
        content: this.content,
        startDate: this.startDate,
        endDate: this.endDate,
        floor: this.floor,
        totalPrice: this.totalPrice,
        companyName: this.companyName,
        rating: this.rating,
        buildingTypeId: this.selectedBuildingType,
        constructionService: this.selectedTypes,
      };

      try {
        const response = await axios.post('/api/reviews/create', reviewRequest, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
        alert('후기가 작성되었습니다.');
        const reviewId = response.data.id;
        this.$router.push(`/reviews/${reviewId}`);
      } catch (error) {
        console.error(error);
        alert('후기 작성에 실패하였습니다.');
      }
    },
  },
};
</script>

<style>
.custom-quill-editor {
  height: 200px;
}

.ql-container {
  height: 100%;
}

.ql-editor {
  min-height: 150px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
