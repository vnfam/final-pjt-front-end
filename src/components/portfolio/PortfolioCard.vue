<template>
  <div
    @click="goToDetailPage"
    class="w-[353px] h-[354px] border-solid border-[1px] border-[#eee] rounded-[8px] cursor-pointer border-box hover:shadow-md"
  >
    <p>{{ portfolio.title }}</p>
    <p>{{ portfolio.projectArea }}</p>
    <p>{{ portfolio.projectLocation }}</p>
    <p>{{ portfolio.buildingType }}</p>
  </div>
</template>

<script>
export default {
  props: {
    portfolio: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    goToDetailPage() {
      this.$router.push(`/portfolio/${this.portfolio.id}`);
    },
  },
};
</script>

<style></style>
