import userProfileApi from "@/api/userProfile"

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getUserProfileStart: "[UserProfile] Get UserProfile Start",
  getUserProfileSuccess: "[UserProfile] Get UserProfile Success",
  getUserProfileFailure: "[UserProfile] Get UserProfile Failure",
}

export const actionTypes = {
  getUserProfile: "[UserProfile] Get UserProfile",
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
