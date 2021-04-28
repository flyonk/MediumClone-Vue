import articleApi from "@/api/article"

const state = {
  data: null,
  isLoading: false,
  error: null,

}

export const mutationTypes = {
  getArticleStart: "[Article] Get Article Start",
  getArticleSuccess: "[Article] Get Article Success",
  getArticleFailure: "[Article] Get Article Failure",

  deleteArticleStart: "[Article] Delete Article Start",
  deleteArticleSuccess: "[Article] Delete Article Success",
  deleteArticleFailure: "[Article] Delete Article Failure",
}

export const actionTypes = {
  getArticle: "[Article] Get Article",
  deleteArticle: "[Article] Delete Article",
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  },
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
}

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
