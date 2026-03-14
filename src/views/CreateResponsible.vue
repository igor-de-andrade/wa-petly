<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import VerticalMenu from '@/components/VerticalMenu.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import FormSection from '@/components/FormSection.vue'
import { createTutor } from '@/services/api'
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'

const router = useRouter()
const { showSuccess, showError } = useToast()

// Form data
const formData = ref({
  nome: '',
  cpf: '',
  rg: '',
  dataNascimento: '',
  genero: '',
  celular: '',
  email: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
})

const loading = ref(false)

// Gender options
const genderOptions = [
  { label: 'Masculino', value: 'MASCULINO' },
  { label: 'Feminino', value: 'FEMININO' },
  { label: 'Outro', value: 'OUTRO' },
]

// UF options
const ufOptions = [
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' },
  { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' },
  { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
]

// Format CPF
function formatCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function handleCPFInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  formData.value.cpf = value
  if (value.length === 11) {
    target.value = formatCPF(value)
  }
}

// Format CEP
function formatCEP(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
}

function handleCEPInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length > 8) value = value.slice(0, 8)
  formData.value.cep = value
  if (value.length === 8) {
    target.value = formatCEP(value)
  }
}

// Format phone
function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

function handlePhoneInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  formData.value.celular = value
  if (value.length === 11) {
    target.value = formatPhone(value)
  }
}

// Submit form
async function handleSubmit() {
  // Validate required fields
  if (!formData.value.nome.trim()) {
    showError('Nome completo é obrigatório')
    return
  }
  if (!formData.value.cpf.trim()) {
    showError('CPF é obrigatório')
    return
  }
  if (!formData.value.genero) {
    showError('Gênero é obrigatório')
    return
  }
  if (!formData.value.celular.trim()) {
    showError('Celular é obrigatório')
    return
  }

  loading.value = true
  try {
    await createTutor({
      nome: formData.value.nome.trim(),
      cpf: formData.value.cpf,
      rg: formData.value.rg || undefined,
      dataNascimento: formData.value.dataNascimento || undefined,
      genero: formData.value.genero,
      celular: formData.value.celular,
      email: formData.value.email || undefined,
      cep: formData.value.cep || undefined,
      logradouro: formData.value.logradouro || undefined,
      numero: formData.value.numero || undefined,
      complemento: formData.value.complemento || undefined,
      bairro: formData.value.bairro || undefined,
      cidade: formData.value.cidade || undefined,
      uf: formData.value.uf || undefined,
    })
    showSuccess('Responsável cadastrado com sucesso!')
    router.push({ name: 'responsible' })
  } catch (err: any) {
    showError(err.message || 'Erro ao cadastrar responsável')
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  router.push({ name: 'responsible' })
}
</script>

<template>
  <div class="layout">
    <VerticalMenu />
    <div class="page">
      <NavBar />
      <div class="page-details">
        <div class="header">
          <h1>Criar Novo Responsável</h1>
          <p>Preencha os dados abaixo para cadastrar um novo tutor no sistema.</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Dados Pessoais -->
          <FormSection icon="fa-user" title="Dados Pessoais" class="dados-pessoais">
            <BaseInput
              v-model="formData.nome"
              label="Nome completo *"
              placeholder="Ex: Ana Maria da Silva"
              type="text"
            />
            <div class="custom-field">
              <label class="input-label">CPF *</label>
              <input
                type="text"
                class="custom-input"
                placeholder="000.000.000-00"
                maxlength="14"
                @input="handleCPFInput"
              />
            </div>
            <BaseInput v-model="formData.rg" label="RG" placeholder="00.000.000-0" type="text" />
            <BaseInput v-model="formData.dataNascimento" label="Data de nascimento" type="date" />
            <BaseSelect
              v-model="formData.genero"
              label="Gênero *"
              :options="genderOptions"
              placeholder="Selecione..."
            />
          </FormSection>

          <!-- Contato -->
          <FormSection icon="fa-phone" title="Contato">
            <div class="custom-field">
              <label class="input-label">Celular *</label>
              <input
                type="text"
                class="custom-input"
                placeholder="(00) 00000-0000"
                maxlength="15"
                @input="handlePhoneInput"
              />
            </div>
            <BaseInput
              v-model="formData.email"
              label="Email"
              placeholder="exemplo@email.com"
              type="email"
            />
          </FormSection>

          <!-- Endereço -->
          <FormSection icon="fa-map-marker-alt" title="Endereço">
            <div class="custom-field">
              <label class="input-label">CEP</label>
              <input
                type="text"
                class="custom-input"
                placeholder="00000-000"
                maxlength="9"
                @input="handleCEPInput"
              />
            </div>
            <BaseInput
              v-model="formData.logradouro"
              label="Logradouro"
              placeholder="Rua, Avenida..."
              type="text"
            />
            <div style="grid-column: span 1">
              <BaseInput v-model="formData.numero" label="Número" type="text" />
            </div>
            <BaseInput
              v-model="formData.complemento"
              label="Complemento"
              placeholder="Apto, Bloco..."
              type="text"
            />
            <BaseInput v-model="formData.bairro" label="Bairro" type="text" />
            <BaseInput v-model="formData.cidade" label="Cidade" type="text" />
            <BaseSelect v-model="formData.uf" label="UF" :options="ufOptions" placeholder="SP" />
          </FormSection>

          <!-- Botões -->
          <div class="form-actions">
            <BaseButton
              label="Cancelar"
              variant="tertiary"
              @click="handleCancel"
              :disabled="loading"
            />
            <BaseButton
              label="Salvar Cadastro"
              variant="primary"
              native-type="submit"
              :disabled="loading"
            />
          </div>
        </form>
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

.header {
  margin-bottom: 30px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.header p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.custom-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dados-pessoais {
  padding: 10px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-family: var(--base-font);
}

.custom-input {
  width: 100%;
  padding: 8px 0px;
  border-radius: 8px;
  border: 1px solid rgb(196, 196, 196);
  font-family: var(--base-font);
  font-size: 14px;
  transition: border-color 0.2s;
}

.custom-input::placeholder {
  padding: 10px;
}

.custom-input:hover {
  border-color: #0ecca3;
}

.custom-input:focus {
  outline: none;
  border-color: #0ecca3;
  box-shadow: 0 0 0 3px rgba(14, 204, 163, 0.1);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  justify-content: flex-end;
}
</style>
