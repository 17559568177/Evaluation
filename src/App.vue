<template>
  <div class="vue-root">
    <StarSky />
    <BrandHead />
    <main class="app" aria-live="polite">
      <RouterView v-slot="{ Component, route }">
        <div class="page" :key="route.fullPath">
          <component :is="Component" />
        </div>
      </RouterView>
    </main>
    <SiteFoot />
    <ToastNote />
    <PosterModal />
  </div>
</template>

<script>
import StarSky from './components/StarSky.vue'
import BrandHead from './components/BrandHead.vue'
import SiteFoot from './components/SiteFoot.vue'
import ToastNote from './components/ToastNote.vue'
import PosterModal from './components/PosterModal.vue'

export default {
  name: 'SelfNoteApp',
  components: { StarSky, BrandHead, SiteFoot, ToastNote, PosterModal }
}
</script>
