<template>
    <div class="text-center">
        <h1 class="text-lg text-orange-500 mb-5">Calendar</h1>
        <Calendar :attributes=attributes is-dark is-expanded />
    </div>
    <div class="text-center my-10">
        <h1 class="text-lg text-orange-500 mb-5">Upcoming</h1>
        <table class="table-auto w-full" v-if="upcomingDividends.length">
            <thead>
                <tr>
                    <th class="dark:text-white pt-0">Asset</th>
                    <th class="text-right dark:text-white pt-0">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dividend in upcomingDividends">
                    <td class="text-left">
                        <ul>
                            <li class="dark:text-white">{{ dividend.ticker }}</li>
                            <li class="text-xs dark:text-white">${{ dividend.amount }} per share</li>
                        </ul>
                    </td>
                    <td class="text-right">
                      <span class="dark:text-white">{{ dividend.date }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Calendar
  },
  created() {
    this.getDividends().then(res => {
      this.dividends = res
    })
  },
  data() {
    return {
      date: new Date(),
      dividends: []
    }
  },
  methods: {
    ...mapActions(['getDividends'])
  },
  computed: {
    attributes() {
      if (this.dividends) {
          return [
          ...this.dividends.map(dividend => ({
            dates: dividend.dates,
            dot: {
              color: dividend.color
            },
            popover: {
              label: dividend.description,
            },
            customData: dividend,
          }))
        ]
      }
    },
    ...mapGetters(['upcomingDividends'])
  }
}
</script>