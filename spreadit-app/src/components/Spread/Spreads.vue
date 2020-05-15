<template>
    <div>
      <Spread
           v-for="(spread, ind) in spreads"
          :key="spread.id"
          :spread="spread"
          :auth-user="authUser"
          v-on:delete="removeDeletedSpread"
          :style="ind !== spreads.length - 1 ? 'border-bottom: 1px solid #ccc;' : '' "
        />
    </div>
</template>

<script>
import Spread from '@/components/Spread/Spread'
import EventBus from '@/eventBus'

export default {
  name: 'Spreads',
  components: {
    Spread
  },
  props: {
    spreads: {
      type: Array,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  },
  created () {
    // listen for event fired
    EventBus.$on('spreadAdded', this.fetchAddedSpread)
  },
  methods: {
    removeDeletedSpread (spreadId) {
      const filteredSpreads = this.spreads.filter(spread => {
        return spread.id !== spreadId
      })

      this.$emit('update:spreads', filteredSpreads)
    },
    fetchAddedSpread (spread) {
      // add spread to top of spreads
      this.spreads.unshift(spread)
    }
  }
}
</script>
