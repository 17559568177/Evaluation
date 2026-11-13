<template>
  <transition name="toast-fade">
    <div v-if="sn.state.toast" class="toast is-on" role="status">{{ sn.state.toast }}</div>
  </transition>
</template>

<script>
import { sn } from '../store'
export default { name: 'ToastNote', setup() { return { sn } } }
</script>
