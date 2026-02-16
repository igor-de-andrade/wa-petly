<script setup lang="ts">
import { computed } from 'vue'

interface BaseCheckboxProps {
  text: string
  modelValue?: boolean
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  modelValue: false,
  disabled: false,
  id: () => `checkbox-${Math.random().toString(36).slice(2)}`,
})

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <div class="base-checkbox">
    <input
      :id="id"
      type="checkbox"
      class="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <label :for="id">{{ text }}</label>
  </div>
</template>

<style scoped>
.base-checkbox {
  display: flex;
  font-family: var(--base-font);
  font-size: 14px;
  gap: 5px;
}
</style>
