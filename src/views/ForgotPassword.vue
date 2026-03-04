<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
</script>

<template>
  <div class="page">
    <section class="image">
      <img class="banner" src="../../public/forgotpassword_image.png" />
    </section>
    <section class="forgot-password-area">
      <img class="logo" src="../../public/logo.png" test-id="logo-petly" />
      <h1 class="page-title" test-id="titulo-formulario">Esqueceu sua senha?</h1>
      <div class="form">
        <BaseInput
          type="email"
          test-id="ipt-email"
          placeholder="Digite seu e-mail cadastrado no Petly"
          icon="fa-solid fa-envelope"
        />

        <BaseButton label="Enviar instruções" test-id="btn-enviar-instrucoes" />

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

.forgot-password-area {
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
  justify-content: center;
}

.page-title {
  color: var(--primary-color);
  padding: 20px 0px;
}
</style>
