<template>
  <div>
    <div class="columns">
      <div class="column is-three-quarters">
        <answer-all></answer-all>
      </div>
      <div class="column">
        <LoginWelcome />
      
        <tip></tip>
        <calendar />
        <Carousel />
      </div>
    </div>
  </div>
</template>

<script>

import Tip from '../card/Tip.vue';
import AnswerAll from './AnswerAll.vue';
import Carousel from '../card/Carousel.vue';
import HotAnswer from './HotAnswer.vue';
import Calendar from '../card/Calendar.vue';
import LoginWelcome from './LoginWelcome.vue';


export default {
  name: "Home",
  components: {HotAnswer, AnswerAll, Tip, Carousel, Calendar, LoginWelcome}, 
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>

<style scoped>
.column.is-three-quarters, .column.is-three-quarters-tablet {
    width: 67% !important; 
}
</style>
