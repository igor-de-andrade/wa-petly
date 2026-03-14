<script setup lang="ts">
/* =========================
 * Props
 * ========================= */
interface BaseSelectProps {
  modelValue?: string | number
  label?: string
  placeholder?: string
  options: { label: string; value: string | number }[]
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  modelValue: '',
  label: '',
  placeholder: 'Selecione...',
  disabled: false,
  id: () => `select-${Math.random().toString(36).slice(2)}`,
})

/* =========================
 * Emits
 * ========================= */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-select">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <select :id="id" class="select" :value="modelValue" :disabled="disabled" @change="handleChange">
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 14px;
  font-family: var(--base-font);
}

.select {
  padding: 7px 12px;
  border-radius: 8px;
  border: 1px solid rgb(196, 196, 196);
  font-family: var(--base-font);
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.select:hover:not(:disabled) {
  border-color: #0ecca3;
}

.select:focus {
  outline: none;
  border-color: #0ecca3;
  box-shadow: 0 0 0 3px rgba(14, 204, 163, 0.1);
}

.select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
