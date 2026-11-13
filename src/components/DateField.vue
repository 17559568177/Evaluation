<template>
  <div class="date-field">
    <button
      type="button"
      class="field-trigger"
      :class="{ 'is-empty': !value, 'is-open': show }"
      :aria-label="ariaLabel"
      @click="open"
    >
      <span class="field-trigger-mark" aria-hidden="true">日</span>
      <span class="field-trigger-body">
        <span class="field-trigger-kicker">生日坐标</span>
        <span class="field-trigger-value">{{ displayText }}</span>
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
      <van-date-picker
        v-model="draft"
        title="选择生日"
        :min-date="minDate"
        :max-date="maxDate"
        :columns-type="['year', 'month', 'day']"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup as VanPopup, DatePicker as VanDatePicker } from 'vant'
import 'vant/es/popup/style'
import 'vant/es/date-picker/style'
import 'vant/es/picker/style'

function parseYmd(s, fallback) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '')
  if (!m) return fallback
  return [m[1], m[2], m[3]]
}

function toYmd(arr) {
  if (!arr || arr.length < 3) return ''
  const y = String(arr[0]).padStart(4, '0')
  const mo = String(arr[1]).padStart(2, '0')
  const d = String(arr[2]).padStart(2, '0')
  return y + '-' + mo + '-' + d
}

function toDate(s, fallback) {
  const parts = parseYmd(s, null)
  if (!parts) return fallback
  return new Date(+parts[0], +parts[1] - 1, +parts[2])
}

function formatDisplay(s) {
  const parts = parseYmd(s, null)
  if (!parts) return ''
  return parts[0] + ' 年 ' + Number(parts[1]) + ' 月 ' + Number(parts[2]) + ' 日'
}

function isZodiacTheme() {
  return typeof document !== 'undefined' &&
    document.body.getAttribute('data-theme') === 'zodiac'
}

export default {
  name: 'DateField',
  components: { VanPopup, VanDatePicker },
  props: {
    value: String,
    min: { type: String, default: '1920-01-01' },
    max: { type: String, default: '2026-12-31' },
    ariaLabel: { type: String, default: '生日' }
  },
  emits: ['update'],
  data() {
    return {
      show: false,
      draft: parseYmd(this.value, ['1998', '06', '15'])
    }
  },
  computed: {
    minDate() { return toDate(this.min, new Date(1920, 0, 1)) },
    maxDate() { return toDate(this.max, new Date(2026, 11, 31)) },
    displayText() {
      return formatDisplay(this.value) || '点这里选择年月日'
    },
    overlayStyle() {
      return {
        background: isZodiacTheme() ? 'rgba(8, 12, 24, .66)' : 'rgba(36, 28, 22, .4)'
      }
    }
  },
  watch: {
    value(v) {
      if (v) this.draft = parseYmd(v, this.draft)
    }
  },
  methods: {
    open() {
      this.draft = parseYmd(this.value, this.draft)
      this.show = true
    },
    onConfirm({ selectedValues }) {
      const next = toYmd(selectedValues || this.draft)
      this.show = false
      if (next) this.$emit('update', next)
    }
  }
}
</script>
