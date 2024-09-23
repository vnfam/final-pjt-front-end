<template>
  <div class="w-full mx-auto px-6 py-8">
    <p class="text-2xl font-semibold text-center pb-6">시공 후기 작성</p>

    <form
      @submit.prevent="insertReview"
      class="max-w-[720px] mx-auto bg-white p-6 border-[1px] border-gray-300 rounded-lg"
    >
      <!-- 제목 입력 -->
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium mb-2">제목</label>
        <input
          v-model="title"
          class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
          type="text"
          placeholder="제목을 입력해주세요."
          required
        />
      </div>

      <!-- 업체명 및 별점 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label for="companyName" class="block text-sm font-medium mb-2">업체명</label>
          <input
            v-model="companyName"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
            type="text"
            placeholder="업체명을 입력해주세요."
            required
          />
        </div>
        <div>
          <label for="rating" class="block text-sm font-medium mb-2">별점</label>
          <input
            v-model="rating"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
            type="number"
            min="1"
            max="5"
            placeholder="별점을 입력해주세요."
            required
          />
        </div>
      </div>

      <!-- 시작/종료 날짜 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label for="startDate" class="block text-sm font-medium mb-2">시작날짜</label>
          <input
            v-model="startDate"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
            type="date"
            required
          />
        </div>
        <div>
          <label for="endDate" class="block text-sm font-medium mb-2">종료날짜</label>
          <input
            v-model="endDate"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
            type="date"
            required
          />
        </div>
      </div>

      <!-- 면적 및 시공 금액 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label for="floor" class="block text-sm font-medium mb-2">면적</label>
          <input
            v-model="floor"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
            type="number"
            placeholder="시공 면적을 입력해주세요."
            required
          />
        </div>
        <div>
          <label for="totalPrice" class="block text-sm font-medium mb-2">시공 금액</label>
          <input
            v-model="totalPrice"
            class="w-full h-[44px] text-sm p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
            type="number"
            placeholder="시공 금액을 입력해주세요."
            required
          />
        </div>
      </div>

      <!-- 건물 종류 -->
      <div class="mb-6">
        <label for="buildingTypes" class="block text-sm font-medium mb-2">건물 종류</label>
        <div class="flex flex-wrap gap-4">
          <div v-for="type in buildingTypes" :key="type.buildingTypeId" class="flex items-center">
            <input
              type="radio"
              :value="type.buildingTypeId"
              v-model="selectedBuildingType"
              class="mr-2 focus:ring-midGreen focus:outline-none focus:ring-1 accent-midGreen"
            />
            <span class="text-sm">{{ type.buildingTypeName }}</span>
          </div>
        </div>
      </div>

      <!-- 시공 종류 -->
      <div class="mb-6">
        <label for="constructionTypes" class="block text-sm font-medium mb-2">시공 종류</label>
        <div class="flex flex-wrap gap-4">
          <div v-for="type in constructionTypes" :key="type.constructionId" class="flex items-center">
            <input
              type="checkbox"
              :value="type.constructionId"
              v-model="selectedConstructionTypes"
              class="mr-2 focus:ring-midGreen focus:outline-none focus:ring-1 accent-midGreen"
            />
            <span class="text-sm">{{ type.constructionName }}</span>
          </div>
        </div>
      </div>

      <!-- 내용 입력 -->
      <div class="mb-6">
        <label for="content" class="block text-sm font-medium mb-2">내용</label>
        <QuillEditor ref="quillEditor" v-model:content="content" :options="editorOptions" required />
      </div>

      <!-- 작성 버튼 -->
      <button
        class="bg-midGreen text-white w-full h-[44px] rounded text-[16px] font-medium mt-6 hover:bg-sky-600"
        type="submit"
      >
        작성하기
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { QuillEditor } from '@vueup/vue-quill';

export default {
  data() {
    return {
      title: '',
      content: '',
      companyName: '',
      rating: '',
      floor: '',
      startDate: '',
      endDate: '',
      totalPrice: '',
      buildingTypes: [],
      selectedBuildingType: '',
      constructionTypes: [],
      selectedConstructionTypes: [],
      editorOptions: {
        placeholder: '내용을 입력해주세요.',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
            ['clean'],
          ],
        },
      },
    };
  },

  async mounted() {
    const response = await axios.get('http://localhost:8080/api/reviews/create');
    const data = response.data;
    this.constructionTypes = data.constructionTypeResponses;
    this.buildingTypes = data.buildingTypeResponses;
  },

  components: {
    QuillEditor,
  },

  methods: {
    async insertReview() {
      const userStore = useUserStore();
      const token = userStore.accessToken;
      const reviewData = {
        title: this.title,
        companyName: this.companyName,
        rating: this.rating,
        floor: this.floor,
        workStartDate: this.startDate,
        workEndDate: this.endDate,
        totalPrice: this.totalPrice,
        buildingTypeId: this.selectedBuildingType,
        constructionTypes: this.selectedConstructionTypes,
      };

      try {
        const response = await axios.post('/api/reviews', reviewData, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
        alert('후기가 작성되었습니다.');
        const reviewId = response.data.reviewId;
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
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
