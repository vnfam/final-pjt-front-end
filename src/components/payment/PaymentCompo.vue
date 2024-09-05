<template>
  <h1>결제 !</h1>
  <button @click="paymentRequest()">결제</button>
</template>

<script>
const SERVER_BASE_URL = 'http://localhost:8080';
const membership_name = 'BASIC';
const membership_id = 1;
const membership_price = 100;
export default {
  props: {
    membership_name: membership_name,
    membership_price: membership_price,
    membership_id: membership_id,
  },

  methods: {
    paymentRequest(membershipId) {
      window.IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
          name: `${membership_name}`,
          amount: `${membership_price}`,
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

          // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
          // (다음 목차에서 설명합니다)
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
