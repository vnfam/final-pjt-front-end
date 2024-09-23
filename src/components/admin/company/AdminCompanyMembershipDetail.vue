<template>
  <div>
    <!-- 기업 로고 -->
    <div class="flex items-center justify-center h-full mb-10">
      <img class="object-fill w-72 h-auto rounded-full rounded-full bg-white" src="@/assets/logo.png" alt="" />
    </div>
    <!-- 기업 정보 -->
    <div>
      <ul class="p-10 rounded-lg bg-white">
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">업체명</label>
          <p class="w-4/5 px-10">뚝딱뚝딱업체</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">멤버십 종류</label>
          <p class="w-1/5 px-10">Basic</p>
          <p class="px-2 border-2 border-solid border-secondary rounded-lg whitespace-nowrap text-secondary">유지</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">멤버십 시작일</label>
          <p class="w-4/5 px-10">24.07.02</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">멤버십 만료일</label>
          <p class="w-4/5 px-10">24.10.7</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">전화번호</label>
          <p class="w-4/5 px-10">010-1234-5678</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">사업자등록번호</label>
          <p class="w-4/5 px-10">123-4567-8910</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">이메일</label>
          <p class="w-4/5 px-10">dukdakInterior</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">비밀번호</label>
          <p class="w-4/5 px-10">dukdakInterior1234</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">상담 수</label>
          <p class="w-4/5 px-10">8건</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">시공 수</label>
          <p class="w-4/5 px-10">2건</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">평점</label>
          <p class="w-4/5 px-10"><font-awesome-icon class="text-midGreen" :icon="['fas', 'star']" />&nbsp; 5.0점</p>
        </li>
      </ul>
    </div>
    <!-- 버튼 공간 -->
    <div class="flex justify-end mt-4 gap-5">
      <button class="rounded-lg p-2 bg-accent hover:bg-secondary" @click="showModal = true">수정</button>
      <button class="rounded-lg p-2 bg-accent hover:bg-secondary" @click="this.$router.back()">되돌아가기</button>
    </div>
    <!-- 버튼에 따른 Modal -->
    <div v-if="showModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Background backdrop -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <!-- Modal 내용 -->
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <svg
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">관리자 권한으로 수정</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      해당 멤버십의 정보를을 정말로 수정하시겠습니까? 해당 게시물의 작업은 그대로 서버에 저장됩니다. 이
                      작업은 취소할 수 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal 버튼 -->
            <div class="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
              <button
                @click="updatePost"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
              >
                수정
              </button>
              <button
                @click="showModal = false"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    updatePost() {
      console.log('Post updated');
      this.showModal = false;
    },
  },
};
</script>

<style>
.littleTitle {
  display: flex;
}
</style>
