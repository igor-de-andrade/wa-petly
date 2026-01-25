<script setup lang="ts"></script>

<template>
  <p class="base-text">
    <slot />
  </p>
</template>

<style scoped>
.base-text {
  font-family: var(--base-font);
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color, #333);
  margin: 0;
}
</style>
