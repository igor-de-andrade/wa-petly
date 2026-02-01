<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseText from '../components/base/BaseText.vue'
import BaseCheckbox from '../components/base/BaseCheckbox.vue'
</script>

<template>
  <div class="page">
    <section class="image">
      <img class="banner" src="../../public/login_image.png" />
    </section>
    <section class="login-area">
      <img class="logo" src="../../public/logo.png" />
      <h1>Crie sua conta</h1>
      <div class="form">
        <BaseInput type="text" placeholder="Seu nome" icon="fa-solid fa-user" />
        <BaseInput type="email" placeholder="Seu e-mail" icon="fa-solid fa-envelope" />
        <BaseInput type="text" placeholder="CRMV-UF" icon="fa-solid fa-id-card" />
        <BaseInput type="password" placeholder="Senha" icon="fa-solid fa-lock" />
        <BaseInput type="password" placeholder="Confirme sua senha" icon="fa-solid fa-lock" />

        <BaseCheckbox text="Concordo com os termos e condições de uso do Petly." />

        <BaseButton label="Criar conta" />
        <div class="aditional-actions">
          <BaseText>
            <RouterLink to="/login">Cancelar</RouterLink>
          </BaseText>
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
  padding: 40px 75px;
  background-color: #ffffff;
  text-align: center;
  height: 540px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
}

.aditional-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

h1 {
  font-family: var(--base-font);
  color: #1976d2;
}
</style>
