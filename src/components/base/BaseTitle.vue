<script setup lang="ts">
import { computed } from 'vue'

type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TitleSize = 1 | 2 | 3

const props = withDefaults(
  defineProps<{
    as?: TitleTag
    size?: TitleSize
  }>(),
  {
    as: 'h2',
    size: 2,
  },
)

const tag = computed(() => props.as)
const sizeClass = computed(() => `size-${props.size}`)
</script>

<template>
  <component :is="tag" class="title" :class="sizeClass">
    <slot />
  </component>
</template>

<style scoped>
.title {
  font-family: var(--base-font);
  font-weight: 600;
  margin: 0;
}

.size-1 {
  font-size: 36px;
}

.size-2 {
  font-size: 24px;
}

.size-3 {
  font-size: 16px;
}
</style>
