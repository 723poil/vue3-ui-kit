<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center p-8 bg-white rounded-lg shadow-xl">
      <h1 class="text-6xl font-bold text-primary">404</h1>
      <p class="text-2xl font-medium text-gray-800 mt-4"> 페이지를 찾을 수 없습니다. </p>
      <p class="text-gray-600 mt-2"> 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. </p>
      <router-link
        to="/"
        class="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
      >
        홈으로 돌아가기
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* You can add custom styles here if needed, or rely on Tailwind */
</style>
