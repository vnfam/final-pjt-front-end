<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">보낸 요청 내역</h3>
    <!-- List of sent requests goes here -->
    <ul>
      <li v-for="(request, index) in sentRequests" :key="index" class="mb-2">
        {{ request.title }} - {{ request.date }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sentRequests: [
        { title: '첫 번째 보낸 요청', date: '2024-09-10' },
        { title: '두 번째 보낸 요청', date: '2024-09-12' },
      ],
    };
  },
};
</script>

<style scoped></style>
