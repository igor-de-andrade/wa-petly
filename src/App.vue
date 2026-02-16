<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>
  <RouterView />
  <ToastContainer />
</template>

<style scoped></style>
