<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" message="Foo is broken" />
    <div v-if="popularTags" class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{name: 'tag', params: {slug: popularTag}}"
          >{{ popularTag }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import {actionTypes} from "@/store/modules/popularTags"
  import AppLoading from "@/components/Loading"
  import AppErrorMessage from "@/components/ErrorMessage"
  export default {
    name: "AppPopularTags",
    components: {
      AppLoading,
      AppErrorMessage,
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.popularTags.isLoading,
        error: (state) => state.popularTags.error,
        popularTags: (state) => state.popularTags.data,
      }),
    },
    mounted() {
      this.$store.dispatch(actionTypes.getPopularTags)
    },
  }
</script>
