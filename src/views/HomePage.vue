<template>
  <NavBar />
  <div class="container py-5">
    <div class="mt-5">
      <h1 class="text-center">最新消息</h1>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
  },
};
</script>