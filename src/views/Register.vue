<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseCheckbox from '../components/base/BaseCheckbox.vue'
</script>

<template>
  <div class="page">
    <section class="image">
      <img class="banner" src="../../public/login_image.png" />
    </section>
    <section class="register-area">
      <img class="logo" test-id="logo-petly" src="../../public/logo.png" />
      <h1 class="page-title" test-id="titulo-formulario">Crie sua conta</h1>
      <div class="form">
        <BaseInput type="text" test-id="ipt-nome" placeholder="Seu nome" icon="fa-solid fa-user" />
        <BaseInput type="email" test-id="ipt-email" placeholder="Seu e-mail" icon="fa-solid fa-envelope" />
        <BaseInput type="text" test-id="ipt-crmv" placeholder="CRMV-UF" icon="fa-solid fa-id-card" />
        <BaseInput type="password" test-id="ipt-senha" placeholder="Senha" icon="fa-solid fa-lock" />
        <BaseInput type="password" test-id="ipt-confirmacao-senha" placeholder="Confirme sua senha" icon="fa-solid fa-lock" />

        <BaseCheckbox class="checkbox" test-id="ckbox-confirmacao-termos" text="Concordo com os termos e condições de uso do Petly." />

        <BaseButton test-id="btn-criar-conta" label="Criar conta" />
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
