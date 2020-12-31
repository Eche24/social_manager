<template>
  <div id="app" class="font-sans flex min-h-screen">
    <sidebar></sidebar>
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
export default {
  components: {
    Sidebar
  }
};
</script>


<style src="./assets/main.css">

