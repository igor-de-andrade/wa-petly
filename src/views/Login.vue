<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'

import { login, isAuthenticated } from '@/services/api'
import { useToast } from '@/composables/useToast'

const email = ref('')
const senha = ref('')
const router = useRouter()
const { showSuccess, showError, showWarning } = useToast()

// redirect away from login if already authenticated
if (isAuthenticated()) {
  router.replace('/authtest')
}

function validate() {
  const missing: string[] = []
  if (!email.value || !String(email.value).trim()) missing.push('Email')
  if (!senha.value || !String(senha.value).trim()) missing.push('Senha')
  return missing
}

async function submit() {
  const missing = validate()
  if (missing.length) {
    showWarning(`Preencha os campos: ${missing.join(', ')}`)
    return
  }

  try {
    await login({ email: email.value, senha: senha.value })
    showSuccess('Login realizado com sucesso!')
    setTimeout(() => router.push('/authtest'), 800)
  } catch (err: any) {
    showError(err?.message || 'Falha ao efetuar login.')
  }
}
</script>

<template>
  <div class="page">
    <section class="image">
      <img class="banner" src="../../public/login_image.png" />
    </section>
    <section class="login-area">
      <img class="logo" test-id="logo-petly" src="../../public/logo.png" />
      <h1 class="page-title" test-id="titulo-formulario">Olá, bem-vindo(a) ao Petly!</h1>
      <div class="form">
        <BaseInput v-model="email" type="email" test-id="ipt-email" placeholder="Digite seu e-mail" icon="fa-solid fa-envelope" />

        <BaseInput v-model="senha" type="password" test-id="ipt-senha" placeholder="Digite sua senha" icon="fa-solid fa-lock" />

        <BaseButton test-id="btn-entrar" label="Entrar" @click="submit" />

        <div class="aditional-actions">
          <p class="regular-text" test-id="txt-esqueceu-senha">
            Esqueceu sua senha?
            <RouterLink to="/forgotpassword">Clique aqui</RouterLink>
          </p>

          <p class="regular-text" test-id="txt-criar-conta">
            Crie sua conta no
            <RouterLink to="/register">Petly</RouterLink>
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

.login-area {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 32px;
  padding: 125px 75px;
  background-color: #ffffff;
  text-align: center;
  height: 370px;
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
  justify-content: space-between;
}

.page-title {
  color: var(--primary-color);
  padding: 20px 0px;
}
</style>
