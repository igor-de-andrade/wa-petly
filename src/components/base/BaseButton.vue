<template>
  <button class="base-button" :class="variantClass" :type="nativeType" :disabled="disabled">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
/* =========================
 * Types
 * ========================= */
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'
type NativeButtonType = 'button' | 'submit' | 'reset'

/* =========================
 * Props
 * ========================= */
interface BaseButtonProps {
  label: string
  variant?: ButtonVariant
  nativeType?: NativeButtonType
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  nativeType: 'button',
  disabled: false,
})

/* =========================
 * Computed
 * ========================= */
const variantClass = computed(() => {
  return `base-button--${props.variant}`
})
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--base-font);

  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;

  border-radius: 6px;
  border: none;
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border 0.2s ease;
}

/* =========================
 * Variants
 * ========================= */
.base-button--primary {
  background-color: #1976d2;
  color: #fff;
}

.base-button--secondary {
  background-color: #e0e0e0;
  color: #333;
}

.base-button--tertiary {
  background-color: transparent;
  border: 1px solid #1976d2;
  color: #1976d2;
}

.base-button--ghost {
  background-color: transparent;
  color: #1976d2;
}

/* =========================
 * States
 * ========================= */
.base-button:hover:not(:disabled) {
  opacity: 0.9;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
