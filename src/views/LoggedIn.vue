<template>
	<v-app class="logged-in-page">
    <v-content>
      <v-container class="fill-height" fluid >
        <h1 class="logged-in-page__title">
          Hello {{ user.profile.full_name }}, glad to see you.
        </h1>
        <v-btn 
          class="logged-in-page__logout-btn"
          data-e2e="logout-btn" 
          color="white" 
          outlined
          @click="logOut"
        >
          Log Out
        </v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
  @import '../styles/variables';
  .logged-in-page {
    background: transparent !important;
    
    &__title {
      width: 100%;
      color: $white;
      text-align: center;
    }
    &__logout-btn {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
</style>

<script>
  import { mapState, mapActions } from 'vuex'
	export default {
		name: 'logged-in',
    computed: mapState({
      user: state => state.user,
      is_logged: state => state.is_logged
    }),
    methods: {
      ...mapActions([
        'setLogOut'
      ]),
      logOut() {
        this.setLogOut()
        this.$router.push('/')
      }
    },
    beforeMount() {
      if(!this.user || !this.is_logged) {
        this.$router.push('/')
      }
    }
	}
</script>