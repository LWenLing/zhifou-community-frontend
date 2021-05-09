<template>
  <section>
    <!--是否登录-->
    <login-welcome />

    <!--今日赠言-->
    <tip-card />

    <!-- 日历 -->
    <calendarCard />
 
    <!-- 热门标签 -->

    <!-- 轮播图片 -->
    <Carousel />
  
    <!--资源推介-->
    <PromotionCard />

  </section>
</template>

<script>
import TipCard from '@/views/card/Tip'
import PromotionCard from '@/views/card/Promotion'
import calendarCard from '@/views/card/Calendar'
import LoginWelcome from '@/views/card/LoginWelcome'
import Carousel from '@/views/card/Carousel.vue'

export default {
  name: 'CardBar',
  components: { LoginWelcome, PromotionCard, TipCard,calendarCard,Carousel }
}
</script>

<style scoped>
</style>
