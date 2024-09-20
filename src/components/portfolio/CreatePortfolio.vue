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
        <QuillEditor ref="quillEditor" v-model:modelValue="content" required />
      </div>

      <div class="flex justify-between items-center mb-[12px]">
        <div class="w-[50%] pr-2">
          <label for="startDate" class="text-[14px] font-normal mb-4">시작날짜</label>
          <div class="mt-2 flex justify-between items-center">
            <input
              v-model="startDate"
              class="flex-grow h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
              type="date"
              :max="today"
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
              :min="startDate"
              :max="today"
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
        <label for="projectLocation" class="text-[14px] font-normal mb-4">시공 지역 </label>
        <div class="flex items-center justify-between">
          <input
            placeholder="시공 지역을 입력해주세요."
            v-model="projectLocation"
            class="w-full mt-2 mr-2 h-[52px] text-[14px] font-normal p-4 rounded-[4px] border-solid border-[1px] border-[#ddd] box-border"
            type="text"
            readonly
            required
          />
          <button
            type="button"
            @click="searchAddress"
            class="mt-2 px-3 py-2 bg-gray-600 text-white rounded-lg text-[16px] whitespace-nowrap"
          >
            주소 검색
          </button>
        </div>
        <!-- Daum 우편번호 서비스 Wrap -->
        <div
          id="wrap"
          ref="wrap"
          class="border border-gray-300 h-72 overflow-hidden relative mx-auto"
          style="display: none"
        >
          <img
            src="//t1.daumcdn.net/postcode/resource/images/close.png"
            class="absolute right-0 top-0 z-10 cursor-pointer"
            @click="foldDaumPostcode"
            alt="접기 버튼"
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
import QuillEditor from '@/components/common/QuillEditor.vue';

export default {
  components: { QuillEditor },
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
      today: '',
    };
  },
  mounted() {
    // 현재 날짜 저장하여 시작날짜와 종료날짜 유효성 검사
    const today = new Date().toISOString().split('T')[0];
    this.today = today;

    this.getConstructionType();
    this.getBuildingType();
  },
  methods: {
    // 주소 검색
    searchAddress() {
      this.openDaumPostcode();
    },
    // Daum 우편번호 서비스 열기
    openDaumPostcode() {
      const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      new window.daum.Postcode({
        oncomplete: (data) => {
          let addr = '';
          let extraAddr = '';

          // 사용자가 도로명 주소를 선택한 경우
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택한 경우
            addr = data.jibunAddress;
          }

          // 도로명 주소 선택 시 참고항목 추가
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

          // 선택한 주소를 주소 필드에 입력
          this.projectLocation = addr + extraAddr;

          // 우편번호 검색 창 닫기
          this.$refs.wrap.style.display = 'none';
          document.body.scrollTop = currentScroll;
        },
        // 창의 크기가 변경될 때 처리
        onresize: (size) => {
          this.$refs.wrap.style.height = size.height + 'px';
        },
        width: '100%',
        height: '100%',
      }).embed(this.$refs.wrap);

      // 우편번호 검색 창 표시
      this.$refs.wrap.style.display = 'block';
    },
    // 우편번호 검색 창 접기
    foldDaumPostcode() {
      this.$refs.wrap.style.display = 'none';
    },

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
        const portfolioId = response.data.id;
        this.$router.push(`/portfolio/${portfolioId}`);
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
