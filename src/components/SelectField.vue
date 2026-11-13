<template>
  <div class="select-field">
    <button
      type="button"
      class="field-trigger"
      :class="{ 'is-open': show }"
      :aria-label="label"
      @click="show = true"
    >
      <span class="field-trigger-mark" aria-hidden="true">地</span>
      <span class="field-trigger-body">
        <span class="field-trigger-kicker">经度带</span>
        <span class="field-trigger-value">{{ currentText }}</span>
      </span>
      <span class="field-trigger-caret" aria-hidden="true">{{ show ? '⌃' : '⌄' }}</span>
    </button>

    <van-popup
      v-model:show="show"
      position="bottom"
      round
      teleport="body"
      :overlay-style="overlayStyle"
      class="sheet-popup"
    >
      <van-picker
        v-model="draft"
        :columns="columns"
        :title="title"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup as VanPopup, Picker as VanPicker } from 'vant'
import 'vant/es/popup/style'
import 'vant/es/picker/style'

function isZodiacTheme() {
  return typeof document !== 'undefined' &&
    document.body.getAttribute('data-theme') === 'zodiac'
}

export default {
  name: 'SelectField',
  components: { VanPopup, VanPicker },
  props: {
    items: Array,
    value: String,
    title: { type: String, default: '选择出生地' },
    label: { type: String, default: '出生地' }
  },
  emits: ['update'],
  data() {
    return { show: false, draft: [this.value] }
  },
  computed: {
    columns() {
      return (this.items || []).map(function (it) {
        return { text: it.text, value: it.key }
      })
    },
    currentText() {
      const hit = (this.items || []).find((it) => it.key === this.value)
      return hit ? hit.text : '请选择'
    },
    overlayStyle() {
      return {
        background: isZodiacTheme() ? 'rgba(8, 12, 24, .66)' : 'rgba(36, 28, 22, .4)'
      }
    }
  },
  watch: {
    value(v) { this.draft = [v] },
    show(v) { if (v) this.draft = [this.value] }
  },
  methods: {
    onConfirm({ selectedValues }) {
      const next = (selectedValues && selectedValues[0]) || this.value
      this.show = false
      if (next) this.$emit('update', next)
    }
  }
}
</script>
