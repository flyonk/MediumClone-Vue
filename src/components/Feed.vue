<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" message="Foo is broken" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: {slug: 'article.author.username'},
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'userProfile',
                params: {slug: 'article.author.username'},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <app-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: 'article.slug'}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p class="article-description">{{ article.description }}</p>
          <span>Read more...</span>
          <app-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import {actionTypes} from "@/store/modules/feed"
  import AppPagination from "@/components/Pagination"
  import {limit} from "@/helpers/vars"
  import {stringify, parseUrl} from "query-string"
  import AppLoading from "@/components/Loading"
  import AppErrorMessage from "@/components/ErrorMessage"
  import AppTagList from "@/components/TagList"
  import AppAddToFavorites from "@/components/AddToFavorites"

  export default {
    name: "AppFeed",
    props: {
      apiUrl: {
        type: String,
        required: true,
      },
    },
    components: {
      AppPagination,
      AppLoading,
      AppErrorMessage,
      AppTagList,
      AppAddToFavorites,
    },
    data() {
      return {
        limit,
      }
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.feed.isLoading,
        feed: (state) => state.feed.data,
        error: (state) => state.feed.error,
      }),
      currentPage() {
        return +(this.$route.query.page || "1")
      },
      baseUrl() {
        console.log(this.$route)
        return this.$route.path
      },
      offset() {
        return this.currentPage * limit - limit
      },
    },
    watch: {
      currentPage() {
        this.fetchFeed()
      },
      apiUrl() {
        this.fetchFeed()
      },
    },
    mounted() {
      this.fetchFeed()
    },
    methods: {
      fetchFeed() {
        const parsedUrl = parseUrl(this.apiUrl)
        const stringifiedParams = stringify({
          limit,
          offset: this.offset,
          ...parsedUrl.query,
        })
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
      },
    },
  }
</script>
