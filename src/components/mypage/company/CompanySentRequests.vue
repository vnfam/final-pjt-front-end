<template>
  <div>
    <h3 class="font-medium text-[18px] mb-4">보낸 요청 내역</h3>
    <!-- List of sent requests goes here -->
    <ul>
      <li v-for="(request, index) in sentRequests" :key="index" class="mb-2">
        {{ request.title }} - {{ request.date }}
      </li>
    </ul>
  </div>
</template>

<script>
import authInstance from '@/utils/axiosUtils';

export default {
  setup() {
    const test = async () => {
      const response = await authInstance.get('/api/estimaterequests/sent');
      console.log(response);
    };

    test();

    return {};
  },
};
</script>

<style scoped></style>
