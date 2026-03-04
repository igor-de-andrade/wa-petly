<script setup lang="ts">
defineProps<{
  icon: string
  backgroundColor: string
}>()
</script>

<template>
  <button class="card" :style="{ background: backgroundColor }">
    <div class="icon">
      <i :class="icon"></i>
    </div>

    <p class="title">
      <slot />
    </p>
  </button>
</template>

<style scoped>
.card {
  height: 140px;
  border-radius: 16px;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  cursor: pointer;
  text-align: left;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18);
}

.icon {
  font-size: 24px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}
</style>
