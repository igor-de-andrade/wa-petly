<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseInput from './base/BaseInput.vue'
import { getCurrentUser } from '@/services/api'
import type { User } from '@/services/api'

const userName = ref('')
const loading = ref(true)

async function fetchUser() {
  try {
    const user: User = await getCurrentUser()
    userName.value = user.nome
  } catch (err) {
    console.error('could not load user data', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <header class="navbar">
    <!-- Busca -->
    <div class="navbar-search">
      <BaseInput
        type="text"
        placeholder="Buscar por tutor, animal, ID ou serviço"
        icon="fa-solid fa-magnifying-glass"
      />
    </div>

    <!-- Ações -->
    <div class="navbar-actions">
      <!-- Slot do botão -->
      <slot />

      <!-- Notificação -->
      <button class="icon-button">
        <i class="fa-regular fa-bell"></i>
      </button>

      <div class="divider" />

      <!-- Usuário -->
      <div class="user">
        <div class="user-info">
          <strong>{{ userName }}</strong>
          <span>Veterinário</span>
        </div>

        <div class="avatar">
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #eaf6fc;
  padding: 16px 24px;
  font-family: var(--base-font);
}

.navbar-search {
  width: 420px;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #6b7280;
}

.divider {
  width: 1px;
  height: 32px;
  background: #d1d5db;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 14px;
}

.user-info span {
  font-size: 12px;
  color: #6b7280;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
</style>
