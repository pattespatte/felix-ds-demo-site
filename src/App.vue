<script setup lang="ts">
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import DemoNotification from './components/common/DemoNotification.vue'
import ComponentNote from './components/common/ComponentNote.vue'
import AppBreadcrumbs from './components/common/AppBreadcrumbs.vue'
</script>

<template>
    <div class="app-shell">
        <DemoNotification />
        <AppHeader />
        <AppBreadcrumbs />
        <main class="app-shell__main" id="main-content">
            <router-view />
        </main>
        <AppFooter />
        <ComponentNote />
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
