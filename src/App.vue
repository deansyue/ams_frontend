<template>
  <div id="ams-frontend">
    <router-view />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "App",
};
</script>

<style>
html,body,#app{
  height: 100%;
  background-color: rgba(129, 216, 208,0.3);
}
</style>