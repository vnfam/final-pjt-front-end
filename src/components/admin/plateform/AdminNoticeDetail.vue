<template>
  <div>
    <div class="mb-8 flex justify-center">
      <img
        class="w-[650px] h-[300px] rounded-lg object-cover"
        :src="require('@/assets/logo.png')"
        alt="공지사항 이미지"
      />
    </div>
    <div class="max-w-[720px] mx-auto bg-white p-6 border-[1px] border-gray-300 rounded-lg">
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium mb-2">제목</label>
        <input
          class="w-full h-[44px] p-3 rounded border focus:outline-none focus:ring-1 focus:ring-midGreen"
          type="text"
          :readonly="!isEditMode"
          v-model="notice.title"
          :class="{ 'bg-gray-100': !isEditMode }"
        />
      </div>

      <div class="mb-6">
        <label for="content" class="block text-sm font-medium mb-2">내용</label>
        <textarea
          class="mt-2 block w-full h-[500px] px-3 py-2 rounded border shadow-sm focus:outline-none focus:ring-1 focus:ring-midGreen resize-none"
          :readonly="!isEditMode"
          v-model="notice.content"
          :class="{ 'bg-gray-100': !isEditMode }"
        >
        ></textarea
        >
      </div>
    </div>
    <div class="flex justify-end mt-4 gap-5">
      <button
        class="bg-midGreen hover:bg-[#2a692d] text-white w-1/2 h-[44px] rounded text-[16px] font-medium mt-6"
        @click="toggleEditMode"
      >
        {{ isEditMode ? '저장' : '수정' }}
      </button>
      <button
        class="bg-midGreen hover:bg-[#2a692d] text-white w-1/2 h-[44px] rounded text-[16px] font-medium mt-6"
        @click="removeNotice()"
      >
        삭제
      </button>
      <button
        class="bg-midGreen hover:bg-[#2a692d] text-white w-1/2 h-[44px] rounded text-[16px] font-medium mt-6"
        @click="this.$router.back()"
      >
        되돌아가기
      </button>
    </div>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute(); // 라우터에서 현재 경로 정보를 가져옴
    const notice = ref([]);
    const isEditMode = ref(false); // 수정 모드 여부
    const noticeId = ref();

    const getNoticeDetail = async () => {
      try {
        const response = await authInstance.get(`/api/admin/notice/${noticeId.value}`);
        notice.value = response.data;
        console.log(notice.value);
      } catch (error) {
        console.log('공지사항을 가져오지 못했습니다.', error);
      }
    };

    const removeNotice = async () => {
      const isConfirm = confirm('정말로 삭제하시겠습니까?');
      if (!isConfirm) {
        return;
      }
      try {
        const response = await authInstance.delete(`/api/admin/notice/${noticeId.value}`);
        console.log(response);
      } catch (error) {
        console.log('공지사항 삭제를 실패했습니다.', error);
      }
    };

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value; // 수정 모드 토글
      if (!isEditMode.value) {
        // 저장 로직을 여기 추가할 수 있음
        console.log('저장되었습니다.', notice.value);
      }
    };

    onMounted(() => {
      noticeId.value = route.params.id; // URL에서 ID 추출
      getNoticeDetail(); // 공지사항 불러오기
    });

    return {
      notice,
      isEditMode,
      noticeId,
      removeNotice,
      toggleEditMode,
    };
  },
};
</script>

<style scoped></style>
