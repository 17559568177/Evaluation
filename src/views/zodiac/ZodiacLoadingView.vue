<template>
  <LoadingOrbit :lines="cfg.loadingLines" sub="SELF NOTE  /  02  ·  STAR NOTE"
                :dark="true" @done="goResult" />
</template>

<script>
import { useRouter } from 'vue-router'
import { useSessionStore } from '../../stores/session'
import LoadingOrbit from '../../components/LoadingOrbit.vue'

export default {
  name: 'ZodiacLoadingView',
  components: { LoadingOrbit },
  setup() {
    const router = useRouter()
    return {
      cfg: useSessionStore().zodiacData,
      goResult: function () { router.push({ name: 'zodiac-result' }) }
    }
  }
}
</script>
