<template>
  <div>
    <!-- 포트폴리오 이미지 -->
    <div class="flex items-center justify-center h-full mb-10">
      <img class="object-fill w-72 h-auto rounded-full rounded-lg bg-white" src="@/assets/replaceHouse.png" alt="" />
    </div>
    <!-- 포트폴리오 내용 -->
    <div>
      <ul class="p-10 rounded-lg bg-white">
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">제목</label>
          <p class="w-4/5 px-10">{{ title }}</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">내용</label>
          <p class="w-4/5 px-10">
            {{ content }}
          </p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">업체명</label>
          <p class="w-4/5 px-10">{{ companyName }}</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">주거 형태</label>
          <p class="w-4/5 px-10">{{ buildingType }}</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">평수</label>
          <p class="w-4/5 px-10">{{ projectArea }}</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">시공분야</label>
          <p class="w-4/5 px-10">{{ constructionTypeService }}</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">시공금액</label>
          <p class="w-4/5 px-10">{{ totalPrice }}</p>
        </li>
        <li class="littleTitle">
          <label for="" class="w-1/5 border-r-2 border-indigo-500">게시일</label>
          <p class="w-4/5 px-10">{{ regDate }}</p>
        </li>
      </ul>
    </div>
    <!-- 버튼 공간 -->
    <div class="flex justify-end mt-4 gap-5">
      <button class="rounded-lg p-2 bg-accent hover:bg-secondary" @click="confirmDeletion">삭제</button>
      <button class="rounded-lg p-2 bg-accent hover:bg-secondary" @click="this.$router.back()">되돌아가기</button>
    </div>
    <!-- 버튼에 따른 Modal -->
    <div v-if="isDeleteModalOpen" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
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
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{{ modalTitle }}</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ modalMessage }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-4 bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                v-if="isDeleteModalOpen"
                @click="confirmDelete"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
              >
                삭제
              </button>
              <button
                @click="isDeleteModalOpen = false"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
      // 임의로 넣어둔 값들
      title: '편안하고 심플한 화이트&블랙 스타일',
      content:
        '화이트&블랙 컬러의 조화는 깔끔하면서도 시크한 느낌을 주는 대표적인 모던 인테리어 스타일입니다. 이번 프로젝트는 고객의 요청에 따라 복잡함을 배제하고, 간결하고 세련된 공간을 연출하는 데 중점을 두었습니다. 흰색의 벽과 천장은 공간을 넓어 보이게 하며, 검은색 가구와 포인트 소품들이 공간에 깊이감과 균형을 더했습니다. 주요 공간 디자인 1. 거실 넓은 흰색 벽과 큰 창문을 통해 자연광이 가득 들어오는 공간입니다. 깔끔한 블랙 소파와 낮은 프로파일의 가구들로 심플함을 유지하며, 포인트로 매트한 블랙 TV 선반을 배치했습니다. 바닥은 밝은 톤의 원목을 사용해 따뜻함을 더했습니다. 2. 주방 주방은 화이트 상판과 블랙 캐비닛의 조합으로 간결한 느낌을 극대화했습니다. 타일 벽면에는 광택 있는 흰색 타일을 사용해 공간에 깔끔함과 세련미를 더했으며, 블랙 스틸소재의 주방 후드를 포인트로 활용했습니다. 3. 침실 벽과 침구는 부드러운 흰색을 사용해 휴식의 공간을 강조했습니다. 머리맡에 있는 블랙 금속 소재의 스탠드 조명이 모던한 분위기를 한층 더해줍니다. 큰 거울을 사용해 공간감을 넓혔으며, 최소한의 가구 배치로 심플함을 유지했습니다. 4. 화장실 화이트 타일과 블랙 악세서리로 대조를 이루어 간결하면서도 현대적인 화장실을 완성했습니다. 벽면에 설치된 간접 조명은 따뜻한 느낌을 주면서도, 세련된 분위기를 유지합니다.',
      companyName: '부자업체',
      buildingType: '아파트',
      projectArea: '32평',
      constructionTypeService: '전체 시공',
      totalPrice: '5000만원',
      regDate: '24.09.29',
      isDeleteModalOpen: false,
      modalTitle: '',
      modalMessage: '',
    };
  },
  methods: {
    // 탈퇴 버튼 클릭시
    confirmDeletion() {
      this.modalTitle = '관리자 권한으로 게시물 삭제';
      this.modalMessage =
        '해당 게시물을 정말로 삭제하시겠습니까? 해당 게시물의 작업은 그대로 서버에 저장됩니다. 이 작업은 취소할 수 없습니다.';
      this.isDeleteModalOpen = true;
      console.log('게시판 삭제완료:', this.isDeleteModalOpen);
    },

    confirmDelete() {
      // 서버로 데이터를 보내는 로직을 여기에 작성
      alert('삭제했습니다.');
      this.isDeleteModalOpen = false;
    },
  },
};
</script>

<style>
.littleTitle {
  display: flex;
}
</style>
