<template>
  <div
    @click="goToDetailPage"
    class="w-[353px] h-[354px] border-solid border-[1px] border-[#eee] rounded-[8px] cursor-pointer border-box hover:shadow-md"
  >
    <p>{{ portfolio.title }}</p>
    <p v-html="sanitizedContent"></p>
    <p>{{ portfolio.projectArea }}</p>
    <p>{{ portfolio.projectLocation }}</p>
    <p>{{ portfolio.buildingType }}</p>
  </div>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
  props: {
    portfolio: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    sanitizedContent() {
      // DOMPurify로 content를 필터링
      return DOMPurify.sanitize(this.portfolio.content);
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
