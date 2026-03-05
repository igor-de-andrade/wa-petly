<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import VerticalMenu from '@/components/VerticalMenu.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import Card from '@/components/Card.vue'
import BaseList from '@/components/list/BaseList.vue'
import BaseListRow from '@/components/list/BaseListRow.vue'
import BaseListCell from '@/components/list/BaseListCell.vue'
import { ref, onMounted } from 'vue'
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
  <div class="layout">
    <VerticalMenu />
    <div class="page">
      <NavBar />
      <div class="page-details">
        <div class="welcome-message">
          <h1>Olá, {{ userName }}!</h1>
          <p>Aqui está o resumo da sua clinica hoje.</p>
        </div>
        <div class="cards">
          <Card icon="fa-solid fa-user-plus" backgroundColor="#0d84f7">
            Criar Novo<br />
            Responsável
          </Card>

          <Card icon="fa-solid fa-paw" backgroundColor="#22c55e">
            Criar Novo<br />
            Animal
          </Card>

          <Card icon="fa-solid fa-calendar-check" backgroundColor="#f59e0b">
            Criar Nova<br />
            Consulta
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
.page {
  width: 100%;
  font-family: var(--base-font);
}

.welcome-message {
  padding: 20px 0px;
}

h1,
p {
  margin: 0px;
}

.page-details {
  padding: 0px 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

small {
  font-size: 12px;
  color: #6b7280;
}

.actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}
</style>
