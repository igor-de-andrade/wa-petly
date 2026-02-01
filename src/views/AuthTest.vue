<script setup lang="ts">
import BaseButton from '../components/base/BaseButton.vue'
</script>

<template>
  <div class="content">
    <h1>Olá, @fulano! 🙋</h1>
    <p>Você está na área autenticada.</p>
    <p>
      As telas da área interna do sistema ainda estão em construção. Em breve essa tela será
      substituída.
    </p>

    <BaseButton variant="tertiary" label="Sair" />
  </div>
</template>

<style scoped>
.content {
  text-align: center;
}
</style>
