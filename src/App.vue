<template>
  <div id="app">
    <app-topbar />
    <router-view></router-view>
  </div>
</template>

<script>
  import AppTopbar from "@/components/TopBar"
  import {actionTypes} from "@/store/modules/auth"
  export default {
    name: "App",
    components: {
      AppTopbar,
    },
    mounted() {
      this.$store.dispatch(actionTypes.getCurrentUser)
    },
  }
</script>

<style></style>
