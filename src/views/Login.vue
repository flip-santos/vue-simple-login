<template>
  <v-app class="login-page">

    <v-alert 
      class="login-page__alert"
      v-if="request_error_message"
      border="left"
      colored-border
      color="pink accent-3"
      elevation="2"
    >
      {{ request_error_message }}
    </v-alert>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="4" >
            <img class="login-page__logo" src="../assets/bambee-symbol-white.svg" title="Bambee" />
            <v-card class="elevation-12">
              <v-card-text>
                
                <v-form ref="login_form" v-model="valid" :lazy-validation="lazy">
                  
                  <v-text-field
                    data-e2e="email-input"
                    prepend-icon="person"
                    name="email"
                    type="email"
                    label="E-mail"
                    v-model="email"
                    :rules="email_rules"
                  />

                  <v-text-field
                    id="password"
                    data-e2e="password-input"
                    prepend-icon="lock"
                    name="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    :rules="password_rules"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                
                <v-btn 
                  class="login-page__btn-login"
                  data-e2e="submit-btn"
                  color="primary" 
                  :disabled="!valid" 
                  @click="validateForm"
                >
                  Log In
                </v-btn>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
  .login-page {
    background: transparent !important;
    &__alert {
      position: absolute !important;
      bottom: 20px;
      left: 20px;
      right: 20px;
    }
    &__logo {
      width: 180px;
      margin-bottom: 20px;
    }
    &__btn-login {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>

<script>
  import API from '../api';
  import { mapActions } from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        valid: true,
        email: '',
        password: '',
        request_error_message: '',
        request_status: null,
        email_rules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password_rules: [
          v => !!v || 'Password is required',
          v => /.{8,}/.test(v) || 'Password must be valid',
        ],
        lazy: false
      }
    },
    methods: {
      ...mapActions([
        'setToken',
        'setUser',
        'setIsLogged',
      ]),
      validateForm () {
        if (this.$refs.login_form.validate()) {
          API.post('user/login', { email: this.email, password: this.password }, {
              validateStatus: (status) => {
                this.request_status = status
                return status >= 200 && status < 300;
              }
            })
            .then(response => {
              // Login sequence
              this.resetValidation()
              this.setToken(response.data.token)
              this.setUser(response.data.user)
              this.setIsLogged(true)
              this.$router.push('logged-in')
            })
            .catch(error => {
              // Setting up error messages
              this.setIsLogged(false)
              switch(this.request_status) {
                case 403:
                case 404:
                  this.request_error_message = error
                  break;
                case 429:
                  this.request_error_message = error.error.text
                  break;
                default:
                  this.request_error_message = ''
              }
            })
        }
      },
      resetValidation () {
        this.request_error_message = ''
        this.$refs.login_form.resetValidation()
      },
    }
  }
</script>
