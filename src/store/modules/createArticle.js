import articleApi from "@/api/article"

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const mutationTypes = {
  createArticleStart: "[createArticle] Create Article Start",
  createArticleSuccess: "[createArticle] Create Article Success",
  createArticleFailure: "[createArticle] Create Article Failure",
}

export const actionTypes = {
  createArticle: "[createArticle] Create New Article",
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart)
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.createArticleFailure,
            result.response.data.errors
          )
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
