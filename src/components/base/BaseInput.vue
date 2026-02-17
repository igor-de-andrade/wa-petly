<script setup lang="ts">
import { ref, computed } from 'vue'

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
 * State
 * ========================= */
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password' && !showPassword.value) {
    return 'password'
  }
  return props.type === 'password' && showPassword.value ? 'text' : props.type
})

const isPasswordField = computed(() => props.type === 'password')

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

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
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
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="onInput"
        :class="{ 'with-icon': icon, 'with-toggle': isPasswordField }"
      />

      <!-- Botão de visibilidade da senha -->
      <button
        v-if="isPasswordField"
        type="button"
        class="password-toggle"
        :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
        @click="togglePasswordVisibility"
        tabindex="-1"
      >
        <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
      </button>
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

.input-wrapper input.with-toggle {
  padding-right: 32px;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.password-toggle:hover {
  color: #333;
}

.password-toggle:focus {
  outline: none;
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
