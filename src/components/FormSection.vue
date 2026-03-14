<script setup lang="ts">
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <div class="form-section">
    <div class="section-header">
      <i :class="`fa-solid ${icon}`"></i>
      <h3>{{ title }}</h3>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.form-section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 12px;
}

.section-header i {
  color: #0ecca3;
  font-size: 18px;
}

.section-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
}

.section-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
</style>
