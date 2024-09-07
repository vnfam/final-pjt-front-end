import HomeCompo from '@/components/HomeCompo.vue';
import CompanySignup from '@/components/login/CompanySignup.vue';
import LoginCompo from '@/components/login/LoginCompo.vue';
import MemberSignup from '@/components/login/MemberSignup.vue';
import RedirectCompo from '@/components/login/RedirectCompo.vue';
import RequestEstimateCompo from '@/components/estimate/RequestEstimateCompo'
import StepOne from '@/components/estimate/StepOne.vue';
import StepTwo from '@/components/estimate/StepTwo.vue';
import StepThree from '@/components/estimate/StepThree.vue';
import StepFour from '@/components/estimate/StepFour.vue';
import StepFive from '@/components/estimate/StepFive.vue';

export default [
  { path: '/', component: HomeCompo },
  { path: '/login', component: LoginCompo },
  { path: '/memberSignup', component: MemberSignup },
  { path: '/companySignup', component: CompanySignup },
  { path:'/oauth/redirect', component: RedirectCompo },
  {
    path: '/requestEstimate',
    component: RequestEstimateCompo,
    children: [
      { path: '', redirect: '/requestEstimate/stepOne' }, // 기본적으로 step1으로 리디렉션
      { path: 'stepOne', component: StepOne },
      { path: 'stepTwo', component: StepTwo },
      { path: 'stepThree', component: StepThree },
      { path: 'stepFour', component: StepFour },
      { path: 'stepFive', component: StepFive }
    ]
  }
];
