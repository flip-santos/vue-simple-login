<template>
  <v-app class="login-page">

    <v-alert class="login-page__alert" type="error" v-if="request_error_message">
      {{ request_error_message }}
    </v-alert>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="4" >
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>                
              </v-toolbar>
              <v-card-text>
                
                <v-form ref="login_form" v-model="valid" :lazy-validation="lazy">
                  
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    type="email"
                    label="E-mail"
                    v-model="email"
                    :rules="email_rules"
                  />

                  <v-text-field
                    id="password"
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
                <v-btn color="primary" :disabled="!valid" @click="validateForm">Log In</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
  .login-page__alert {
    position: absolute !important;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
</style>

<script>
  import API from '../api';

  export default {
    name: 'login',
    data() {
      return {
        valid: true,
        email: 'test@test.com',
        password: 'password',
        request_error_message: '',
        request_status: null,
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
      validateForm () {
        if (this.$refs.login_form.validate()) {
          API.post('user/login', { email: this.email, password: this.password }, {
              validateStatus: (status) => {
                this.request_status = status
                return status >= 200 && status < 300;
              }
            })
            .then(response => {
              console.log(response)
              this.request_error_message = ''
              this.resetValidation()
            })
            .catch(error => {
              // Setting up error messages
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
      resetForm () {
        this.$refs.login_form.reset()
      },
      resetValidation () {
        this.$refs.login_form.resetValidation()
      },
    }
  }
</script>
