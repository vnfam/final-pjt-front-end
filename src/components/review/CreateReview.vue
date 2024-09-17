<template>
  <div class="w-full mx-auto">
    <p class="text-2xl font-semibold text-center pb-4">시공 후기 작성</p>

    <form
      @submit.prevent="insertReview"
      class="w-[800px] mb-2 overflow-x-hidden overflow-y-scroll px-10 pt-2 pb-4 pb-20 mx-auto"
    >
      <!-- 기본 리뷰 입력 -->
      <div class="mb-[12px]">
        <label for="title" class="text-[14px] font-normal mb-4">제목</label>
        <div class="mt-2 flex justify-between items-center">
          <input
            v-model="title"
            class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="text"
            placeholder="제목을 입력해주세요."
            required
          />
        </div>
      </div>

      <div class="mb-[12px]">
        <label for="content" class="text-[14px] font-normal mb-4">내용</label>
        <QuillEditor ref="quillEditor" contentType="html" v-model:content="content" :options="editorOptions" />
      </div>

      <!-- 업체 정보 -->
      <div class="mb-[12px] flex items-center justify-between">
        <div class="w-[50%] pr-2">
          <label for="companyName" class="text-[14px] font-normal mb-4">업체명</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="companyName"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text"
              placeholder="업체명을 입력해주세요."
              required
            />
          </div>
        </div>

        <div class="w-[50%] pl-2">
          <label for="rating" class="text-[14px] font-normal mb-4">별점</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="rating"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="number"
              placeholder="별점을 입력해주세요."
              required
            />
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mb-[12px]">
        <div class="w-[50%] pr-2">
          <label for="startDate" class="text-[14px] font-normal mb-4">시작날짜</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="startDate"
              @input="validateDates"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
              @input="validateDates"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="number"
              placeholder="시공 면적을 입력해주세요."
              required
            />
          </div>
        </div>

        <div class="w-[50%] pl-2">
          <label for="totalPrice" class="text-[14px] font-normal mb-4">시공 금액</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="totalPrice"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="number"
              placeholder="시공 금액을 입력해주세요."
              required
            />
          </div>
        </div>
      </div>

      <div class="mb-[12px]">
        <label for="buildingTypes" class="text-[14px] font-normal mb-4">건물 종류</label>
        <div class="mt-2 flex flex-wrap gap-2">
          <div v-for="type in buildingTypes" :key="type.id" class="flex items-center">
            <input type="radio" :value="type.id" v-model="selectedBuildingType" name="buildingType" class="mr-2" />
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
import { QuillEditor } from '@vueup/vue-quill';

export default {
  data() {
    return {
      title: '',
      content: '',
      imagesToUpload: [],
      editorOptions: {
        placeholder: '내용을 입력해주세요.',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'],
              ['link', 'image', 'video', 'formula'],

              ['clean'], // remove formatting button
            ],
            handlers: {
              image: this.imageHandler,
            },
          },
        },
      },
      companyName: '',
      rating: '',
      projectArea: '',
      // startDate: '',
      // endDate: '',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      totalPrice: '',
      buildingTypes: [],
      selectedBuildingType: '',
      constructionTypes: [],
      selectedTypes: [],
    };
  },
  computed: {
    // 시공 전체 선택 여부 계산
    isAllSelected() {
      return this.selectedTypes.length === this.constructionTypes.length;
    },
  },
  components: {
    QuillEditor,
  },

  methods: {
    // 시공 기간이 조건에 맞지 않게 설정될 경우 endDate를 빈 값으로 초기화
    validateDates() {
      if (this.startDate && this.endDate) {
        if (this.endDate < this.startDate) {
          this.startDate = '';
          this.endDate = '';
          alert(`종료 날짜는 시작 날짜보다 앞설 수 없습니다.\n날짜를 다시 입력해주세요.`);
        }
      }
    },
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
    async insertReview() {
      const userStore = useUserStore();
      const token = userStore.accessToken;
      console.log(this.content);
      const reviewRequestData = {
        title: this.title,
        companyName: this.companyName,
        rating: this.rating,
        workStartDate: this.startDate,
        workEndDate: this.endDate,
        totalPrice: this.totalPrice,
        buildingTypeId: this.selectedBuildingType,
        constructionService: this.selectedTypes,
      };

      try {
        const reviewRequest = await axios.post('/api/reviews', reviewRequestData, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
        alert('후기가 작성되었습니다.');
        // 1. 게시글 중 크기가 작은 일부만 등록한다.
        const reviewId = reviewRequest.data.reviewId;

        console.log(reviewId);
        // 2. 게시글의 이미지 전체를 등록한다.

        await this.uploadRemainContents(reviewId);
      } catch (error) {
        console.error(error);
        alert('후기 작성에 실패하였습니다.');
      }
    },

    imageHandler(value) {
      console.log(value);
      console.log('이미지 핸들러 호출.');
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        console.log(file);

        if (!file) {
          console.log('파일이 선택되지 않음.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const editor = this.$refs.quillEditor.getQuill();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', e.target.result);

          console.log(range);
          this.imagesToUpload.push({ file, placeholder: e.target.result });
          console.log(e.target.result);
        };
        reader.readAsDataURL(file);
      };
    },

    async uploadRemainContents(reviewId) {
      for (let image of this.imagesToUpload) {
        try {
          const formData = new FormData();
          formData.append('file', image.file);
          const imageUpladRequest = await axios.post(`http://localhost:8080/api/reviews/${reviewId}/images`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const imageUrl = imageUpladRequest.data;
          this.content = this.content.replace(image.placeholder, imageUrl);
        } catch (error) {
          console.error('Image upload fa  iled:', error);
        }
      }

      const response = await axios.patch(`http://localhost:8080/api/reviews/${reviewId}`, {
        content: this.content,
      });

      console.log('Final content:', this.content);

      const registerResult = response.data;
      if (registerResult) {
        alert('등록 성공!');
        this.$router.push(`/reviews/${reviewId}`);
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
