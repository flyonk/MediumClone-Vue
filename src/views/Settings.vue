<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <app-validation-errors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="URL of Profile Picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                :disabled="isSubmitting"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="Logout">
            Or click here to Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex"
  import {
    getterTypes as authGetterTypes,
    actionTypes as authActionTypes,
  } from "@/store/modules/auth"
  import AppValidationErrors from "@/components/ValidationErrors"
  export default {
    name: "AppSettings",
    components: {
      AppValidationErrors,
    },
    computed: {
      ...mapState({
        isSubmitting: (state) => state.settings.isSubmitting,
        validationErrors: (state) => state.settings.validationErrors,
      }),
      ...mapGetters({
        currentUser: authGetterTypes.currentUser,
      }),
      form() {
        if (this.currentUser) {
          return {
            username: this.currentUser.username,
            bio: this.currentUser.bio,
            email: this.currentUser.email,
            image: this.currentUser.image,
            password: "",
          }
        }
        return {
          username: "",
          bio: "",
          email: "",
          image: "",
          password: "",
        }
      },
    },
    methods: {
      onSubmit() {
        console.log("onSubmit", this.form)
        this.$store.dispatch(authActionTypes.updateCurrentUser, {
          currentUserInput: this.form,
        })
      },
      Logout() {
        this.$store.dispatch(authActionTypes.logout).then(() => {
          this.$router.push({name: "globalFeed"})
        })
      },
    },
  }
</script>
