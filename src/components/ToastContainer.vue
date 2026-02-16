<template>
  <div class="toast-root">
    <transition-group name="toast" tag="div">
      <div v-for="t in toasts" :key="t.id" :class="['toast', `toast-${t.type}`]">
        <div class="toast-content">
          <i :class="iconClass(t.type)" class="toast-icon" aria-hidden="true"></i>
          <div class="toast-message">{{ t.message }}</div>
          <button class="toast-close" @click="removeToast(t.id)" aria-label="Fechar">&times;</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const { toasts, removeToast } = useToast()

function iconClass(type: string) {
  if (type === 'success') return 'fa-solid fa-circle-check'
  if (type === 'error') return 'fa-solid fa-circle-xmark'
  if (type === 'warning') return 'fa-solid fa-triangle-exclamation'
  return ''
}
</script>

<style scoped>
.toast-root {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast {
  min-width: 220px;
  max-width: 360px;
  padding: 10px 14px;
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  font-family: var(--base-font);
  font-size: 14px;
}
.toast-success { background-color: #2e7d32; }
.toast-error { background-color: #c62828; }
.toast-warning { background-color: #f9a825; color: #000; }

.toast-enter-from { transform: translateY(-8px); opacity: 0 }
.toast-enter-active { transition: all 200ms ease }
.toast-leave-to { transform: translateY(-8px); opacity: 0 }
.toast-leave-active { transition: all 200ms ease }

.toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
}
.toast-icon {
  font-size: 18px;
  width: 22px;
}
.toast-message {
  flex: 1;
  white-space: pre-line;
}
.toast-close {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  padding: 2px 6px;
  line-height: 1;
}
</style>
