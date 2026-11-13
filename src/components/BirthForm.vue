<template>
  <div class="birthform">
    <div class="field">
      <span class="field-label">01 / 你的生日</span>
      <DateField :value="birth.date" min="1920-01-01" max="2026-12-31" @update="setDate" />
      <span class="field-error">{{ !birth.date ? '请选择年月日' : (ok ? '' : '日期无效，请检查') }}</span>
    </div>
    <div class="field">
      <span class="field-label">02 / 来到世界的时段</span>
      <SegPicker :items="periods" :value="birth.period" @update="setPeriod" />
      <span class="field-note">不记得也没关系，选一个最接近的就好。</span>
    </div>
    <div class="field">
      <span class="field-label">03 / 出生地所在的经度带</span>
      <SelectField :items="cities" :value="birth.city" @update="setCity" />
      <span class="field-note">用于星语简版的上升校正，不需要精确地址。</span>
    </div>
  </div>
</template>

<script>
import { sn } from '../store'
import DateField from './DateField.vue'
import SegPicker from './SegPicker.vue'
import SelectField from './SelectField.vue'

export default {
  name: 'BirthForm',
  components: { DateField, SegPicker, SelectField },
  props: { birth: Object, periods: Array, cities: Array },
  setup() { return { sn } },
  computed: {
    ok() { return sn.validDate(this.birth.date) }
  },
  methods: {
    setDate(v) { this.birth.date = v },
    setPeriod(v) { this.birth.period = v },
    setCity(v) { this.birth.city = v }
  }
}
</script>
