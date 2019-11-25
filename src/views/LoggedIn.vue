<template>
	<v-app id="login-page">
    <v-content>
      <v-container class="fill-height" fluid >
        <h1>Hello {{ user.profile.full_name}}, glad to see you.</h1>
        <v-btn color="primary" @click="logOut">LogOut</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

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