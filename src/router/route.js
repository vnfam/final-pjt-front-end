import CompanyDetail from '@/components/company/CompanyDetail.vue';
import HomeCompo from '@/components/HomeCompo.vue';
import CompanySignup from '@/components/login/CompanySignup.vue';
import LoginCompo from '@/components/login/LoginCompo.vue';
import MemberSignup from '@/components/login/MemberSignup.vue';
import RedirectCompo from '@/components/login/RedirectCompo.vue';
import CreatePortfolio from '@/components/portfolio/CreatePortfolio.vue';

export default [
  { path: '/', component: HomeCompo },
  { path: '/login', component: LoginCompo },
  { path: '/memberSignup', component: MemberSignup },
  { path: '/companySignup', component: CompanySignup },
  { path: '/oauth/redirect', component: RedirectCompo },
  { path: '/company/:id', component: CompanyDetail },
  { path: '/portfolio/create', component: CreatePortfolio },
];
