<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import VerticalMenu from '@/components/VerticalMenu.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import Card from '@/components/Card.vue'
import BaseList from '@/components/list/BaseList.vue'
import BaseListRow from '@/components/list/BaseListRow.vue'
import BaseListCell from '@/components/list/BaseListCell.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getTutors, deleteTutor } from '@/services/api'
import type { Tutor } from '@/services/api'
import { useToast } from '@/composables/useToast'

// reactive list of tutors fetched from backend
const tutors = ref<Tutor[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// toast helpers
const { showSuccess, showError } = useToast()

function formatCpf(cpf: string) {
  // expecting only digits from API
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    tutors.value = await getTutors()
  } catch (err: any) {
    error.value = err.message || String(err)
  } finally {
    loading.value = false
  }
})

// ask user and delete a tutor
async function confirmDelete(id: number) {
  const ok = window.confirm('Deseja realmente excluir este responsável?')
  if (!ok) return

  try {
    await deleteTutor(id)
    tutors.value = tutors.value.filter((t) => t.id !== id)
    showSuccess('Responsável excluído com sucesso!')
  } catch (err: any) {
    showError(err.message || String(err))
  }
}
</script>

<template>
  <div class="layout">
    <VerticalMenu />
    <div class="page">
      <NavBar>
        <BaseButton label="Novo responsável" />
      </NavBar>
      <div class="page-details">
        <h1>Responsáveis</h1>
        <br />
        <BaseList style="--cols: 4">
          <!-- Header -->
          <template #header>
            <span>Nome</span>
            <span>CPF</span>
            <span>Celular</span>
            <span></span>
          </template>

          <!-- dynamic rows -->
          <template v-if="loading">
            <BaseListRow>
              <BaseListCell colspan="4">Carregando...</BaseListCell>
            </BaseListRow>
          </template>
          <template v-else-if="error">
            <BaseListRow>
              <BaseListCell colspan="4">
                <span class="error">{{ error }}</span>
              </BaseListCell>
            </BaseListRow>
          </template>
          <template v-else>
            <template v-if="tutors.length === 0">
              <BaseListRow>
                <BaseListCell colspan="4">Nenhum responsável encontrado.</BaseListCell>
              </BaseListRow>
            </template>
            <template v-else>
              <BaseListRow v-for="tutor in tutors" :key="tutor.id">
                <BaseListCell>
                  <div
                    class="avatar"
                    :style="{ background: tutor.genero === 'FEMININO' ? '#f8c0d8' : '#0ecca3' }"
                  >
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <strong>{{ tutor.nome }}</strong>
                </BaseListCell>

                <BaseListCell>
                  <span class="cpf-tag">{{ formatCpf(tutor.cpf) }}</span>
                </BaseListCell>

                <BaseListCell>{{ tutor.celular || '—' }}</BaseListCell>

                <BaseListCell class="actions" align="right">
                  <button><i class="fa-solid fa-pen"></i></button>
                  <button @click="confirmDelete(tutor.id)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </BaseListCell>
              </BaseListRow>
            </template>
          </template>
        </BaseList>
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

.page-details {
  padding: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #0ecca3;
  color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
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

.cpf-tag {
  display: inline-block;
  background: #eef2ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.error {
  color: #c53030;
  font-weight: bold;
}
</style>
