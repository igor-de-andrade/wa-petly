<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseText from '../components/base/BaseText.vue'
</script>

<template>
  <div class="page">
    <section class="image">
      <img class="banner" src="../../public/login_image.png" />
    </section>
    <section class="login-area">
      <img class="logo" src="../../public/logo.png" />
      <h1>Olá, bem-vindo(a) ao Petly!</h1>
      <div class="form">
        <BaseInput type="email" placeholder="Digite seu e-mail" icon="fa-solid fa-envelope" />

        <BaseInput type="password" placeholder="Digite sua senha" icon="fa-solid fa-lock" />

        <BaseButton label="Entrar" />

        <div class="aditional-actions">
          <BaseText>
            Esqueceu sua senha?
            <RouterLink to="/forgotpassword">Clique aqui</RouterLink>
          </BaseText>

          <BaseText>
            Crie sua conta no
            <RouterLink to="/register">Petly</RouterLink>
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

h1 {
  font-family: var(--base-font);
  color: #1976d2;
}
</style>
