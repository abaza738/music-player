<script setup lang="ts">
import Nav from './components/Nav.vue';

</script>

<template>
  <Nav />

  <main class="flex flex-col items-center flex-1 p-2 sm:w-full md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
    <router-view></router-view>
  </main>
</template>


