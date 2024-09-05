<template>
  <h1>결제 !</h1>

  <div>
    <div v-for="membership in membershipList" :key="membership.memberShipId">
      <p>Type: {{ membership.type }}</p>
      <p>Price: {{ membership.price }}</p>
      <button @click="paymentRequest(membership)">결제</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
const SERVER_BASE_URL = 'http://localhost:8080';

export default {
  
  data() {
    return {
      membershipList: [],
    }
  },

  mounted() {
    // memberships를 호출해서 membershipList 조회
    axios.get(`${SERVER_BASE_URL}/api/memberships`)
      .then(response => {
        console.log(response.data);
        this.membershipList = response.data.data;
        console.log(this.membershipList);
      })
  },

  methods: {
    paymentRequest(memberShip) {
      // 1. 결제 정보를 생성한다.

      // 2. 이후 PG사를 통해 실제 결제를 요청한다.
      window.IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: `payment-${crypto.randomUUID()}`, // 서버 내부에서 생성한 주문 고유 번호
          name: `${memberShip.type}`,
          amount: `${memberShip.price}`,
          buyer_email: 'gildong@gmail.com',
          buyer_name: '홍길동',
          buyer_tel: '010-4242-4242',
          buyer_addr: '서울특별시 강남구 신사동',
          buyer_postcode: '01181',
        },
        async (response) => {
          if (response.error_code != null) {
            return alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
          }


//          고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
//          (다음 목차에서 설명합니다)
          const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // imp_uid와 merchant_uid, 주문 정보를 서버에 전달합니다
            body: JSON.stringify({
              imp_uid: response.imp_uid,
              merchant_uid: response.merchant_uid,
              // 주문 정보...
            }),
          });
        }
      );
    },
  },
};
</script>

<style></style>
