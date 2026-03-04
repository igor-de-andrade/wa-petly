<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout, getCurrentUser } from '@/services/api'

const router = useRouter()

interface MenuItem {
  label: string
  to: string
  icon: string
}

const menuItems: MenuItem[] = [
  { label: 'Início', to: '/home', icon: 'fa-solid fa-house' },
  { label: 'Agenda', to: '/agenda', icon: 'fa-solid fa-calendar' },
  { label: 'Responsáveis', to: '/responsible', icon: 'fa-solid fa-users' },
  { label: 'Animais', to: '/animais', icon: 'fa-solid fa-paw' },
  { label: 'Histórico', to: '/historico', icon: 'fa-solid fa-clock-rotate-left' },
  { label: 'Internações', to: '/internacoes', icon: 'fa-solid fa-kit-medical' },
]

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <aside class="menu">
    <!-- Logo -->
    <div class="menu-header">
      <img class="logo" src="../../public/logo.png" alt="Petly" />
      <h1>Petly</h1>
    </div>

    <hr />

    <!-- Navegação -->
    <nav class="menu-nav">
      <RouterLink
        v-for="item in menuItems"
        :key="item.label"
        :to="item.to"
        class="menu-item"
        active-class="active"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <hr />

    <!-- Rodapé -->
    <div class="menu-footer">
      <button class="menu-item aditional-actions">
        <i class="fa-solid fa-gear"></i>
        <span>Configurações</span>
      </button>
      <button class="menu-item aditional-actions" @click="handleLogout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Sair</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.menu {
  width: 280px;
  height: 100vh;
  background: #7ecdf2;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: var(--base-font);
}

.menu-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin: 0;
}

.menu-header img {
  width: 80px;
}

.menu-header h1 {
  font-size: 24px;
  font-weight: 600;
}

.logo {
  border-radius: 100px;
}

hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  margin: 24px 0;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: background 0.2s;
}

.menu-item i {
  width: 20px;
  text-align: center;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.menu-item.active {
  background: #4f7cff;
  font-weight: 600;
}

.aditional-actions {
  background: transparent;
  border: none;
  width: 100%;
  cursor: pointer;
}
</style>
