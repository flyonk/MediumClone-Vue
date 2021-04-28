<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
  import AppLoading from "@/components/Loading"
  import AppArticleForm from "@/components/ArticleForm"
  import {actionTypes} from "@/store/modules/editArticle"
  import {mapState} from "vuex"

  export default {
    name: "AppEditArticle",
    components: {
      AppArticleForm,
      AppLoading,
    },
    computed: {
      ...mapState({
        isSubmitting: (state) => state.editArticle.isSubmitting,
        isLoading: (state) => state.editArticle.isLoading,
        article: (state) => state.editArticle.article,
        validationErrors: (state) => state.editArticle.validationErrors,
      }),
      initialValues() {
        if (!this.article) {
          return null
        }
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList,
        }
      },
    },
    mounted() {
      this.$store.dispatch(actionTypes.getArticle, {
        slug: this.$route.params.slug,
      })
    },
    methods: {
      onSubmit(articleInput) {
        const slug = this.$route.params.slug
        this.$store
          .dispatch(actionTypes.updateArticle, {articleInput, slug})
          .then((article) => {
            this.$router.push({name: "article", params: {slug: article.slug}})
          })
      },
    },
  }
</script>
