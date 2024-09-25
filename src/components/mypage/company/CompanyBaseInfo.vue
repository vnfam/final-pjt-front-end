<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-lg">
    <div class="flex flex-col justify-center items-center w-full mb-8">
      <div class="w-32 h-32">
        <img src="/imgs/bear.jpg" class="object-cover w-full h-full rounded-full shadow-lg" alt="Profile Image" />
      </div>
      <h2 class="text-2xl font-semibold mt-4">{{ info.companyName }}</h2>
      <p class="text-sm text-midGreen">
        <font-awesome-icon icon="star" />
        <span class="ml-1">{{ info.rating }}</span>
      </p>
      <p class="text-sm text-gray-500">{{ info.email }}</p>
    </div>

    <form @submit.prevent="updateCompany" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">사업자 번호</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="사업자 번호 입력"
          :value="info.companyNumber"
          readonly
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">업체명</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="업체 이름 입력"
          readonly
          :value="info.companyName"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">대표 이름</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="대표 이름 입력"
          readonly
          :value="info.owner"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">이메일</label>
        <input
          type="email"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="이메일 입력"
          :value="info.email"
          readonly
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">주소</label>
        <input
          type="email"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="업체 주소 입력"
          :value="info.address"
          readonly
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">비밀번호</label>
        <input
          type="password"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="비밀번호 입력"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
        <input
          type="password"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="비밀번호 확인"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">휴대전화</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="휴대전화 입력"
          :value="info.phoneNumber"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">시공 종류 할 거야</label>
        <input
          type="text"
          class="mt-2 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-midGreen"
          placeholder="시공 종류 할 거야"
        />
      </div>

      <div class="flex justify-center">
        <button type="submit" class="px-6 py-3 bg-midGreen text-white font-medium rounded-md transition duration-300">
          수정
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';
import { ref } from 'vue';

export default {
  setup() {
    const info = ref([
      {
        password: '',
        confirmPassword: '',
        phoneNumber: '',
      },
    ]);

    const companyInfo = async () => {
      try {
        const response = await authInstance.get('/api/company/mypage');
        info.value = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('업체 정보를 가져오지 못했습니다.', error);
      }
    };

    const updateCompany = async () => {
      // 비밀번호 확인
      if (info.value.password !== info.value.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        // 사용자 정보 업데이트 API 호출
        console.log(info.value.password);
        console.log(info.value.phoneNumber);
        await authInstance.patch('/api/company/mypage', {
          password: info.value.password,
          phoneNumber: info.value.phoneNumber,
        });
        alert('정보가 성공적으로 수정되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('정보 수정에 실패했습니다.', error);
      }
    };

    companyInfo();

    return {
      info,
      updateCompany,
    };
  },
};
</script>

<style scoped></style>
