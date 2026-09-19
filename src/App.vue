<script setup lang="ts">
// App shell – chrome (header, notification, footer) is wired in phase 2.
// The main landmark lives here so every routed view renders inside it.
</script>

<template>
    <div class="app-shell">
        <main class="app-shell__main">
            <router-view />
        </main>
    </div>
</template>

<style scoped lang="scss">
.app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.app-shell__main {
    flex: 1;
}
</style>
