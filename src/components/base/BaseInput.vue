<script setup lang="ts">
/* =========================
 * Props
 * ========================= */
interface BaseInputProps {
  modelValue?: string | number | Date
  type?: string
  label?: string
  placeholder?: string
  helper?: string
  error?: string
  icon?: string
  id?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  type: 'text',
  label: '',
  placeholder: '',
  helper: '',
  error: '',
  icon: '',
  id: () => `input-${Math.random().toString(36).slice(2)}`,
  disabled: false,
})

/* =========================
 * Emits
 * ========================= */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

/* =========================
 * Handlers
 * ========================= */
function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="base-input">
    <!-- Label -->
    <label v-if="label" :for="id" class="label">
      {{ label }}
    </label>

    <!-- Wrapper do input -->
    <div class="input-wrapper" :class="{ 'has-error': error }">
      <!-- Ícone -->
      <i v-if="icon" :class="icon" class="input-icon"></i>

      <!-- Input -->
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="onInput"
        :class="{ 'with-icon': icon }"
      />
    </div>

    <!-- Microcópia -->
    <small v-if="helper && !error" class="helper">
      {{ helper }}
    </small>

    <!-- Erro -->
    <small v-if="error" class="error">
      {{ error }}
    </small>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input {
  font-family: var(--base-font);
  border-radius: 8px;
  border: 1px solid rgb(196, 196, 196);
}

.label {
  font-weight: 500;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.input-wrapper input.with-icon {
  padding-left: 32px;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.has-error input {
  border-color: #e53935;
}

.helper {
  color: #666;
  font-size: 12px;
}

.error {
  color: #e53935;
  font-size: 12px;
}
</style>
