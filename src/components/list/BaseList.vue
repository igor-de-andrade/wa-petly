<template>
  <div class="list">
    <!-- Header -->
    <div class="list-header">
      <slot name="header" />
    </div>

    <!-- Rows -->
    <div class="list-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.list {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.list-header {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  padding: 16px 24px;
  background: #ececec;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
}

.list-body {
  display: flex;
  flex-direction: column;
}
</style>
