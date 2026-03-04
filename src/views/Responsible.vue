<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import VerticalMenu from '@/components/VerticalMenu.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import Card from '@/components/Card.vue'
import BaseList from '@/components/list/BaseList.vue'
import BaseListRow from '@/components/list/BaseListRow.vue'
import BaseListCell from '@/components/list/BaseListCell.vue'
import BaseButton from '@/components/base/BaseButton.vue'
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
        <BaseList style="--cols: 4">
          <!-- Header -->
          <template #header>
            <span>Nome</span>
            <span>CPF</span>
            <span>Celular</span>
            <span></span>
          </template>

          <!-- Row -->
          <BaseListRow>
            <BaseListCell>
              <div class="avatar">
                <i class="fa-solid fa-user"></i>
              </div>
              <strong>Igor Andrade</strong>
            </BaseListCell>

            <BaseListCell>
              <BaseTag color="green">176.347.907-29</BaseTag>
            </BaseListCell>

            <BaseListCell> (21) 97726-2752 </BaseListCell>

            <BaseListCell class="actions" align="right">
              <button><i class="fa-solid fa-pen"></i></button>
              <button><i class="fa-solid fa-trash"></i></button>
            </BaseListCell>
          </BaseListRow>
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
</style>
