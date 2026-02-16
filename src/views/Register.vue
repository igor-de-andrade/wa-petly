<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseCheckbox from '../components/base/BaseCheckbox.vue'

import { registerUser } from '@/services/api'
import { useToast } from '@/composables/useToast'

// reactive form state
const nome = ref('')
const email = ref('')
const crmv = ref('')
const senha = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)
const router = useRouter()
const { showSuccess, showError, showWarning } = useToast()

function validateRequiredFields() {
  const missing: string[] = []
  if (!nome.value || !String(nome.value).trim()) missing.push('Nome')
  if (!email.value || !String(email.value).trim()) missing.push('Email')
  if (!senha.value || !String(senha.value).trim()) missing.push('Senha')
  if (!confirmPassword.value || !String(confirmPassword.value).trim()) missing.push('Confirmação de senha')
  return missing
}

async function submitForm() {
  // check required fields first
  const missing = validateRequiredFields()
  if (missing.length) {
    showWarning(`Preencha os campos:\n${missing.join('\n')}`)
    return
  }

  // frontend inconsistencies -> show warning toast and skip request
  if (!termsAccepted.value) {
    showWarning('É necessário aceitar os termos.')
    return
  }
  if (senha.value !== confirmPassword.value) {
    showWarning('As senhas não coincidem.')
    return
  }

  try {
    await registerUser({
      nome: nome.value,
      email: email.value,
      crmv: crmv.value,
      senha: senha.value,
    })
    // show success toast then redirect
    showSuccess('Usuário cadastrado com sucesso!')
    setTimeout(() => router.push('/login'), 1000)
  } catch (err: any) {
    // API validation errors => show error toast with returned message(s)
    showError(err?.message || 'Falha ao cadastrar usuário.')
  }
}
</script>

<template>
  <div class="page">
    <section class="image">
      <img class="banner" src="../../public/login_image.png" />
    </section>
    <section class="register-area">
      <img class="logo" test-id="logo-petly" src="../../public/logo.png" />
      <h1 class="page-title" test-id="titulo-formulario">Crie sua conta</h1>
      <div class="form" @keydown.enter.prevent="submitForm">
        <BaseInput
          v-model="nome"
          type="text"
          test-id="ipt-nome"
          placeholder="Seu nome"
          icon="fa-solid fa-user"
        />
        <BaseInput
          v-model="email"
          type="email"
          test-id="ipt-email"
          placeholder="Seu e-mail"
          icon="fa-solid fa-envelope"
        />
        <BaseInput
          v-model="crmv"
          type="text"
          test-id="ipt-crmv"
          placeholder="CRMV-UF"
          icon="fa-solid fa-id-card"
        />
        <BaseInput
          v-model="senha"
          type="password"
          test-id="ipt-senha"
          placeholder="Senha"
          icon="fa-solid fa-lock"
        />
        <BaseInput
          v-model="confirmPassword"
          type="password"
          test-id="ipt-confirmacao-senha"
          placeholder="Confirme sua senha"
          icon="fa-solid fa-lock"
        />

        <BaseCheckbox
          v-model="termsAccepted"
          class="checkbox"
          test-id="ckbox-confirmacao-termos"
          text="Concordo com os termos e condições de uso do Petly."
        />

        <BaseButton
          test-id="btn-criar-conta"
          label="Criar conta"
          @click="submitForm"
        />
        <div class="aditional-actions">
          <p class="regular-text" test-id="btn-cancelar">
            <RouterLink to="/login">Cancelar</RouterLink>
          </p>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  background-color: rgb(224, 224, 224);
  min-height: 100vh;
  align-items: center;
}

.logo {
  width: 100px;
  border-radius: 100px;
}

.banner {
  border-radius: 32px;
  height: 620px;
}

.register-area {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 32px;
  padding: 40px 75px;
  background-color: #ffffff;
  text-align: center;
  height: 540px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 400px;
}

.aditional-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.page-title {
  color: var(--primary-color);
  padding: 20px 0px;
}
</style>
