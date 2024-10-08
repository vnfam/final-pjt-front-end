<template>
  <div class="flex-col">
    <!-- header -->
    <div class="mb-10 p-5 bg-white rounded-lg">
      <h2 class="font-semibold text-xl mb-4">고객 가입 관리</h2>
      <ul class="flex gap-4">
        <li>
          <label for="" class="font-medium">총 고객 가입자수</label>
          <p class="text-red">{{ totalMembers }}명</p>
        </li>
        <li>
          <label for="" class="font-medium">신규 고객 가입자수</label>
          <p class="text-red">{{ newMembers }}명</p>
        </li>
      </ul>
    </div>
    <!-- center -->
    <div>
      <table class="table border-2 border-solid border-gray-300 border-collapse w-full">
        <thead>
          <tr>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">고객명</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">닉네임</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">이메일</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">전화번호</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">가입일</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">메일인증</th>
            <th class="bg-gray-200 text-center p-2 whitespace-nowrap">상세보기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">{{ member.name }}</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">{{ member.nickName }}</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">{{ member.email }}</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              {{ formatPhoneNumber(member.phoneNumber) }}
            </td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">{{ member.createAt }}</td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              {{ member.verified ? 'O' : 'X' }}
            </td>
            <td class="text-center p-2 border-t border-gray-300 bg-white whitespace-nowrap">
              <button
                class="px-2 rounded-lg whitespace-nowrap bg-gray-200 cursor-pointer hover:bg-gray-300"
                @click="viewMemberDetail(member)"
              >
                상세보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- footer -->
    <div class="mt-5">
      <vue-paginate
        :model-value="page"
        :page-count="totalPage"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        prev-text="<"
        next-text=">"
        :container-class="'flex justify-center font-sans cursor-pointer'"
        :page-link-class="'m-3 hover:bg-accent '"
        :prev-link-class="'m-3'"
        :next-link-class="'m-3'"
        active-class="bg-accent rounded-md"
        @update:model-value="page = $event"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { VuePaginate } from '@svifty7/vue-paginate';
import { useRouter } from 'vue-router';
import { authInstance } from '@/utils/axiosUtils';
import dayjs from 'dayjs'; // 날짜를 계산하기 위해 dayjs를 사용합니다.

export default defineComponent({
  components: {
    VuePaginate,
  },
  setup() {
    const page = ref(1);
    const pageSize = ref(6);
    const totalPage = ref();

    const members = ref([]);
    const totalMembers = ref(0);
    const newMembers = ref(0);
    const router = useRouter();

    // 현재 날짜 기준 2주 이내의 가입자를 찾는 함수
    const isNewMember = (createAt) => {
      const now = dayjs(); // 현재 날짜
      const signup = dayjs(createAt); // 가입 날짜
      return now.diff(signup, 'day') <= 14; // 14일 이내인지 확인
    };

    // 멤버 데이터를 가져오는 함수
    const fetchMembers = async () => {
      try {
        const response = await authInstance.get(`/api/admin/members?page=${page.value - 1}&size=${pageSize.value}`);
        members.value = response.data.slice || [];
        totalMembers.value = response.data.list.length;

        totalPage.value = response.data.totalPage;

        // 신규 고객 수 계산
        newMembers.value = response.data.list.filter((member) => isNewMember(member.createAt)).length;
      } catch (error) {
        console.error('멤버 목록을 불러오는데 실패했습니다.', error);
      }
    };

    // 페이지 클릭 핸들러
    const clickCallback = (pageNum) => {
      page.value = pageNum;
      fetchMembers();
    };

    // 회원 상세보기 페이지로 이동
    const viewMemberDetail = (member) => {
      router.push({
        path: `/mypage/admin/adminMemberList/${member.id}`,
      });
    };

    // 전화번호 포맷
    const formatPhoneNumber = (phoneNumber) => {
      if (!phoneNumber) return '';

      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }

      return phoneNumber;
    };

    // 페이지 변경 시 데이터 다시 가져오기
    watch(page, () => {
      fetchMembers();
    });

    // 컴포넌트가 마운트될 때 데이터 불러오기
    onMounted(() => {
      fetchMembers();
    });

    return {
      page,
      pageSize,
      totalPage,
      members,
      totalMembers,
      newMembers,
      clickCallback,
      viewMemberDetail,
      formatPhoneNumber,
    };
  },
});
</script>

<style scoped>
th {
  border-bottom: 2px solid gray;
}
</style>
