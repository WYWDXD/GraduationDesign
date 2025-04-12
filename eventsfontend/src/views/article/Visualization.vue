<script setup >
import CrossBar  from '@/components/Crossbar.vue'
import Line from '@/components/Line.vue';
import MapV from '@/components/MapV.vue';
import Radar from '@/components/Radar.vue';



</script>

<template>
  <div class="container">
    <div class="item item1">
      <Radar />
    </div>
    <div class="item item2">
      <MapV />
    </div>
    <div class="item item3">
      <CrossBar />
    </div>
    <div class="item item4">
      <Line />
    </div>
 


   
  </div>


</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 3px;
  background: url('@/assets/bg.jpg');
  background-size: cover;
  background-position: center center;
}



.item2{
  grid-row: 1 / 4;
  grid-column:1 / 2;

}
</style>
