<template>
  <div class="row">
    <slot />
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  padding: 16px 24px;
  align-items: center;
  border-top: 1px solid #eef2f7;
}

.row:hover {
  background: #f9fbfd;
}
</style>
