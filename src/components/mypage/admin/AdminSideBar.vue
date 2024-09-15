<template>
  <div class="flex h-full text-2xl items-center flex-col p-5 border-8">
    <ul>
      <li class="py-5">
        <router-link to="/admin/accounts" active-class="text-midGreen">회원관리</router-link>
      </li>
      <li class="py-5">
        <router-link to="/admin/memberships" active-class="text-midGreen">멤버십관리</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
