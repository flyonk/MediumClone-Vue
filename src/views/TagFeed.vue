<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggler :tag-name="tagName" />
          <app-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3"><app-popular-tags /></div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppPopularTags from "@/components/PopularTags"
  import AppFeed from "@/components/Feed"
  import AppBanner from "@/components/Banner"
  import AppFeedToggler from "@/components/FeedToggler"
  export default {
    name: "AppTagFeed",
    components: {
      AppFeed,
      AppPopularTags,
      AppBanner,
      AppFeedToggler
    },
    computed: {
      tagName() {
        return this.$route.params.slug
      },
      apiUrl() {
        return `/articles?tag=${this.tagName}`
      },
    },
  }
</script>
