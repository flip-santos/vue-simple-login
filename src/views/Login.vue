<template>
  <v-app id="login-page">
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="4" >
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>                
              </v-toolbar>
              <v-card-text>
                
                <v-form
                  ref="login_form"
                  v-model="valid"
                  :lazy-validation="lazy"
                >
                  
                  <v-text-field
                    label="E-mail"
                    name="email"
                    prepend-icon="person"
                    type="text"
                    :rules="email_rules"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    :rules="password_rules"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!valid" @click="validate">Log In</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      valid: true,
      email: '',
      email_rules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password_rules: [
        v => !!v || 'Password is required',
        v => /./.test(v) || 'Password must be valid',
      ],
      lazy: false
    }
  },
  methods: {
    validate () {
      if (this.$refs.login_form.validate()) {
        console.log('Entrou!')
      }
    },
    resetForm () {
      this.$refs.login_form.reset()
    },
    resetValidation () {
      this.$refs.login_form.resetValidation()
    },
  }
}
</script>
