<template>
  <LoadingOrbit :lines="cfg.loadingLines" sub="SELF NOTE  /  01  ·  ATTACHMENT"
                :dark="false" @done="goResult" />
</template>

<script>
import { useRouter } from 'vue-router'
import { useSessionStore } from '../../stores/session'
import LoadingOrbit from '../../components/LoadingOrbit.vue'

export default {
  name: 'LoveLoadingView',
  components: { LoadingOrbit },
  setup() {
    const router = useRouter()
    return {
      cfg: useSessionStore().loveData,
      goResult: function () { router.push({ name: 'love-result' }) }
    }
  }
}
</script>
