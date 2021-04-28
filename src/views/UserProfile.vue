<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <!-- FOLLOW USER BUTTON -->
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{name: 'settings'}"
                >Edit Profile Settings</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-cs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  >My Posts</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                  >Favorites Posts</router-link
                >
              </li>
            </ul>
          </div>
          <app-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex"
  import {actionTypes as userProfileActionTypes} from "@/store/modules/userProfile"
  import {getterTypes as authGetterTypes} from "@/store/modules/auth"
  import appFeed from "@/components/Feed"
  export default {
    name: "AppUserProfile",
    components: {
      appFeed,
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.userProfile.isLoading,
        error: (state) => state.userProfile.error,
        userProfile: (state) => state.userProfile.data,
      }),
      ...mapGetters({
        currentUser: authGetterTypes.currentUser,
      }),
      isCurrentUserProfile() {
        if (!this.currentUser || !this.userProfile) {
          return false
        }
        return this.currentUser.username === this.userProfile.username
      },
      apiUrl() {
        const isFavorites = this.$route.path.includes("favorites")
        return isFavorites
          ? `/articles?favorites=${this.userProfileSlug}`
          : `/articles?author=${this.userProfileSlug}`
      },
      userProfileSlug() {
        return this.$route.params.slug
      },
      routeName() {
        return this.$route.name
      },
    },
    watch: {
      userProfileSlug() {
        this.getUserProfile()
      },
    },
    mounted() {
      this.getUserProfile()
    },
    methods: {
      getUserProfile() {
        this.$store.dispatch(userProfileActionTypes.getUserProfile, {
          slug: this.$route.params.slug,
        })
      },
    },
  }
</script>
