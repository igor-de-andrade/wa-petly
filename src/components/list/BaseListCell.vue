<template>
  <div class="cell" :class="`align-${align}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'left' | 'center' | 'right'
  }>(),
  {
    align: 'left',
  },
)
</script>

<style scoped>
.cell {
  font-size: 14px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* alinhamentos */
.align-left {
  justify-content: flex-start;
  text-align: left;
}

.align-center {
  justify-content: center;
  text-align: center;
}

.align-right {
  justify-content: flex-end;
  text-align: right;
}
</style>
