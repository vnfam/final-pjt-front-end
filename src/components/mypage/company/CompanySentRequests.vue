<template>
  <div>
    <h3 class="font-medium text-[18px] mb-4">보낸 요청 내역</h3>
    <!-- List of sent requests goes here -->
    <ul>
      <li v-for="(request, index) in sentRequests" :key="index" class="mb-4">
        <h4 class="font-bold">견적 ID: {{ request.estimateId }}</h4>
        <p>상태: {{ request.estimateStatus }}</p>

        <div v-if="request.estimateResponse">
          <p><strong>주소:</strong> {{ request.estimateResponse.fullAddress }}</p>
          <p><strong>건물 유형:</strong> {{ request.estimateResponse.buildingType }}</p>
          <p><strong>예산:</strong> {{ request.estimateResponse.budget }}</p>
          <p><strong>층수:</strong> {{ request.estimateResponse.floor }}</p>
          <p><strong>일정:</strong> {{ request.estimateResponse.schedule }}</p>
        </div>

        <div v-if="request.memberResponse">
          <p><strong>회원 이메일:</strong> {{ request.memberResponse.email }}</p>
          <p><strong>닉네임:</strong> {{ request.memberResponse.nickName }}</p>
          <p><strong>연락처:</strong> {{ request.memberResponse.phoneNumber }}</p>
        </div>

        <div v-if="request.constructionPrices">
          <h4 class="font-bold">공사 가격:</h4>
          <ul>
            <li v-for="(price, type) in request.constructionPrices" :key="type">{{ type }}: {{ price }}만원</li>
          </ul>
        </div>

        <p><strong>총 가격:</strong> {{ request.totalPrice }}만원</p>
      </li>
    </ul>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const sentRequests = ref([]);

    const fetchRequests = async () => {
      try {
        const response = await authInstance.get('/api/estimaterequests/sent');
        sentRequests.value = response.data; // Assuming the data array is directly in response.data
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch requests', error);
      }
    };

    onMounted(() => {
      fetchRequests();
    });

    return {
      sentRequests,
    };
  },
};
</script>

<style scoped></style>
