<template>
  <div class="container mx-auto p-6">
    <!-- Sidebar -->
    <div class="flex max-w-7xl">
      <div class="basis-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">마이페이지</h2>
        <ul class="text-gray-800">
          <li class="mb-2">
            <router-link to="info" activeClass="bg-gray-200" class="block p-2 rounded hover:bg-gray-200"
              >기본정보</router-link
            >
          </li>
          <li class="mb-2">
            <router-link activeClass="bg-gray-200" to="requestlist" class="block p-2 rounded hover:bg-gray-200"
              >견적내역</router-link
            >
          </li>

          <li class="mb-2">
            <router-link to="reviewlist" class="block p-2 rounded hover:bg-gray-200">후기내역</router-link>
          </li>
          <li>
            <router-link to="bookmark" class="block p-2 rounded hover:bg-gray-200">북마크내역</router-link>
          </li>
        </ul>
      </div>
      <!-- Main Content -->
      <div class="basis-3/4 bg-white shadow-2xl rounded-lg p-6 ml-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
};
</script>

<style></style>
