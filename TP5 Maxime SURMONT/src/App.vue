<template>
  <div id="app">
    <tasksManager/>
  </div>
</template>

<script>
import tasksManager from './components/tasksManager.vue';

export default {
  name: 'app',
  components: {
	  tasksManager,
  },
};
</script>

<style>
  #app{
    font-family: "Raleway", sans-serif;
  }
</style>
