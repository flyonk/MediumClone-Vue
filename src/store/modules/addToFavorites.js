import addToFavoritesApi from "@/api/addToFavorites"

export const mutationTypes = {
  addToFavoritesStart: "[addToFavorites] Add to Favorites Start",
  addToFavoritesSuccess: "[addToFavorites] Add to Favorites Success",
  addToFavoritesFailure: "[addToFavorites] Add to Favorites Failure",
}

export const actionTypes = {
  addToFavorites: "[addToFavorites] Add To Favorites",
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise.then((article) => {
        context.commit(mutationTypes.addToFavoritesSuccess, article)
        resolve(article)
      })
    }).catch(() => {
      context.commit(mutationTypes.addToFavoritesFailure)
    })
  },
}

export default {
  actions,
  mutations,
}
