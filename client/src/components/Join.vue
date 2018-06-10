<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <ul>
              <li v-on:click="register = true">REGISTER</li>
              <li v-on:click="register = false">LOGIN</li>
            </ul>
          </v-flex>
          <v-flex xs12 sm8 md6 v-if="register">
            <v-card class="elevation-12">
              <v-toolbar dark color="red">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="name" prepend-icon="person" name="name" label="Name" type="text"></v-text-field>
                  <v-text-field v-model="username" prepend-icon="person_outline" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white" v-on:click="signup">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8 md6 v-else>
            <v-card class="elevation-12">
              <v-toolbar dark color="red">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" prepend-icon="person" name="login" label="Username" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="login" color="white">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
      :timeout="2000"
      :top="true"
      v-model="snackbar"
    >
      {{ text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { userSignup, userLogin } from '../utils/helpers.js'
export default {
  name: 'join',
  data () {
    return {
      msg: 'Welcome To Chat App',
      register: false,
      drawer: null,
      name: null,
      username: null,
      password: null,
      snackbar: false,
      text: null
    }
  },
  props: {
    source: String
  },
  mounted () {
    if (this.$store.state.user._id) {
      this.$router.push('/home')
    }
  },
  methods: {
    async signup () {
      if (!this.name || !this.username || !this.password) {
        this.snackbar = true
        this.text = 'Fill up all the details.'
      } else {
        const res = await userSignup(this.name, this.username, this.password)
        if (res) {
          this.snackbar = true
          this.text = 'Successful ! Login to continue'
        } else {
          this.snackbar = true
          this.text = 'Some error occured, try again'
        }
      }
    },
    async login () {
      if (!this.username || !this.password) {
        this.snackbar = true
        this.text = 'Fill up all the details.'
      } else {
        const res = await userLogin(this.username, this.password)
        if (res) {
          this.$socket.emit('refreshSocket', this.username)
          this.$router.push('/home')
        } else {
          this.snackbar = true
          this.text = 'Error occured'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
  color:gray;
  cursor: pointer;
}

#inspire{
  text-align: center;
}

a {
  color: #35495E;
}
</style>
