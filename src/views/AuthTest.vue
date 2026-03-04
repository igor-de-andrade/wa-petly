<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import BaseButton from '../components/base/BaseButton.vue'
import { logout, getCurrentUser } from '@/services/api'
import type { User } from '@/services/api'

const router = useRouter()
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

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <div v-if="loading" class="content">
      <p>Carregando...</p>
    </div>
    <div v-else class="content">
      <h1>Olá, {{ userName }}! 🙋</h1>
      <p>Você está na área autenticada.</p>
      <p>
        As telas da área interna do sistema ainda estão em construção. Em breve essa tela será
        substituída.
      </p>

      <BaseButton variant="tertiary" label="Sair" @click="handleLogout" />
    </div>
  </div>
</template>

<style scoped>
.content {
  text-align: center;
}
</style>
