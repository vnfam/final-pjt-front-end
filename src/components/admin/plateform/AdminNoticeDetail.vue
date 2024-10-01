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
          class="w-full h-[44px] p-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-midGreen"
          type="text"
          readonly
          v-model="notice.title"
        />
      </div>

      <div class="mb-6">
        <label for="content" class="block text-sm font-medium mb-2">내용</label>
        <textarea
          class="mt-2 block w-full h-[500px] px-3 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-midGreen resize-none"
          readonly
          v-model="notice.content"
        ></textarea>
      </div>
    </div>
    <div class="flex justify-end mt-4 gap-5">
      <button
        class="bg-midGreen hover:bg-[#2a692d] text-white w-1/2 h-[44px] rounded text-[16px] font-medium mt-6"
        @click="confirmEdition"
      >
        수정
      </button>
      <button
        class="bg-midGreen hover:bg-[#2a692d] text-white w-1/2 h-[44px] rounded text-[16px] font-medium mt-6"
        @click="confirmDeletion"
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
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute(); // 라우터에서 현재 경로 정보를 가져옴
    const notice = ref([]);

    const getNoticeDetail = async (noticeId) => {
      try {
        const response = await authInstance.get(`/api/admin/notice/${noticeId}`);
        notice.value = response.data;
        console.log(notice.value);
      } catch (error) {
        console.log('공지사항을 가져오지 못했습니다.', error);
      }
    };

    onMounted(() => {
      const noticeId = route.params.id; // URL에서 ID 추출
      getNoticeDetail(noticeId); // 공지사항 불러오기
    });

    return {
      notice,
    };
  },
};
</script>

<style scoped></style>
