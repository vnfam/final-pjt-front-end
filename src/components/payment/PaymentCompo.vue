<template>
  <div>
    <div v-for="membership in membershipList" :key="membership.id">
      <div>{{ membership.type }}</div>
      <div>{{ membership.price }}</div>
      <button @click="this.paymentRequest(membership.id)">결제하기</button>
    </div>

    <button @click="this.refundRequest()">환불 요청</button>
    <input type="text" v-model="id" style="background-color: aliceblue" />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { mapState } from 'pinia';
import authInstance from '@/utils/axiosUtils';

const SERVER_BASE_URL = 'http://localhost:8080';

export default {
  data() {
    return {
      membershipList: [],
      id: 36,
    };
  },

  computed: {
    ...mapState(useUserStore, ['user']),

    ...mapState(useUserStore, {
      token: 'accessToken',
    }),
  },

  mounted() {
    axios.get(`${SERVER_BASE_URL}/api/membershiptypes`).then(
      (response) => {
        this.membershipList = response.data.data;
        this.membershipList.forEach((item) => console.log(item));
      },
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
  },

  methods: {
    async paymentRequest(membershipId) {
      console.log('결제 요청');
      console.log(membershipId);

      // 향후 Authorization Header 전송을 수행해야한다.

      const response = await authInstance.post(`/api/payment/prepare`, {
        membershipId: membershipId,
      });

      const price = response.data.data.price;
      const membershipType = response.data.data.type;
      const merchantUid = response.data.data.merchantUid;

      console.log(price);
      console.log(response);
      console.log('토큰 정보 : ' + this.token);

      window.IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: `${merchantUid}`, // 주문 고유 번호
          name: `${membershipType}`,
          amount: `${price}`,

          buyer_email: 'gildong@gmail.com',
          buyer_name: '홍길동',
          buyer_tel: '010-4242-4242',
          buyer_addr: '서울특별시 강남구 신사동',
          buyer_postcode: '01181',
        },

        async (response) => {
          try {
            console.log(response);
            const complete = await authInstance.post(`${SERVER_BASE_URL}/api/memberships`, {
              impUid: response.imp_uid,
              merchantUid: response.merchant_uid,
              success: response.success,
              paidAmount: response.paid_amount,
            });

            const paymentResult = complete.data.data;

            console.log(paymentResult);
            // payment 결과에 따라
            if (paymentResult) {
              // 어떤걸 할지 결정해야함.
            }
          } catch (error) {
            console.log(error);
          }

          // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
          // (다음 목차에서 설명합니다)
          // const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   // imp_uid와 merchant_uid, 주문 정보를 서버에 전달합니다
          //   body: JSON.stringify({
          //     imp_uid: response.imp_uid,
          //     merchant_uid: response.merchant_uid,
          //     // 주문 정보...
          //   }),
          // });
        }
      );
    },
    async refundRequest() {
      const result = await authInstance.post(`${SERVER_BASE_URL}/api/membership`, {
        id: this.id,
      });

      console.log(result);
    },
  },
};
</script>

<style></style>
