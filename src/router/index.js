import { createRouter, createWebHistory } from 'vue-router';
import routes from './route';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 라우팅 발생 시 스크롤을 맨 위로 이동
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
