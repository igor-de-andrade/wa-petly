<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="base-checkbox">
    <input type="checkbox" class="checkbox" />
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.base-checkbox {
  display: flex;
  font-family: var(--base-font);
  font-size: 14px;
}
</style>
