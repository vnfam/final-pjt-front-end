<template>
  <div>
    <div class="pb-5">
      <h2>현재 총 가입자수</h2>
      <p>4명</p>
      <h2>현재 총 가입비</h2>
      <p>500원</p>
    </div>
    <div>
      <ul class="flex-col rounded-md border-solid border-2 border-indigo-600">
        <li class="justify-around py-2 border-b-2">
          <p>업체Id</p>
          <p>업체명</p>
          <p>멤버십 종류</p>
          <p>멤버십 금액</p>
          <p>멤버삽 가입일</p>
          <p>멤버십 종료일</p>
        </li>
        <li class="justify-around py-2 border-b-2" @click="$router.push('companyMembershtipDetail')">
          <p>1</p>
          <p>부자업체</p>
          <p>Basic</p>
          <p>100원</p>
          <p>24.9.20</p>
          <p>24.10.20</p>
        </li>
        <li class="justify-around py-2 border-b-2" @click="$router.push('companyMembershtipDetail')">
          <p>2</p>
          <p>프리미엄업체</p>
          <p>Premium</p>
          <p>150원</p>
          <p>24.9.17</p>
          <p>24.10.17</p>
        </li>
        <li class="justify-around py-2 border-b-2" @click="$router.push('companyMembershtipDetail')">
          <p>3</p>
          <p>뚝딱뚝딱업체</p>
          <p>Basic</p>
          <p>100원</p>
          <p>24.09.07</p>
          <p>24.10.7</p>
        </li>
        <li class="justify-around py-2 border-b-2" @click="$router.push('companyMembershtipDetail')">
          <p>4</p>
          <p>장승범업체</p>
          <p>Premium</p>
          <p>150원</p>
          <p>24.08.23</p>
          <p>24.9.23</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.littleTitle {
  display: flex;
}
li {
  display: flex;
}
</style>
