<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>VUE CHAT</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :href="'/home/room/'+ item.title">
          <v-list-tile-action>
            <v-icon>{{ 'launch' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="black--text" color="white" fixed app>
      <v-toolbar-side-icon class="black--text hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-if="list.length === 0">Welcome, {{ name }}</v-toolbar-title>
      <v-toolbar-title v-else>
        {{ roomName }}
        <v-spacer></v-spacer>
        <p style="padding: 0; margin: 0; font-size: 10px; color: lightgray;">{{ typing }}</p>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="list.length > 0" @click.stop="rightDrawer = !rightDrawer">
        <v-icon class="black--text">contacts</v-icon>
      </v-btn>
      <v-btn icon v-on:click="disc">
        <v-icon class="black--text">exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-navigation-drawer
      fixed
      v-model="rightDrawer"
      app
      v-if="list.length > 0"
      right
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Active Members</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in list" :key="item._id">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      drawer: true,
      rightDrawer: false,
      items: [
        { title: 'PUBLIC' },
        { title: 'C' },
        { title: 'C++' },
        { title: 'JAVA' },
        { title: 'PYTHON' }
      ],
      right: null,
      name: null,
      roomName: null,
      typing: null,
      list: []
    }
  },
  mounted () {
    if (!this.$store.state.user._id) {
      this.$router.push('/')
    } else {
      this.name = this.$store.state.user.name
    }
  },
  methods: {
    disc () {
      this.$store.commit('RESET_DATA')
      this.$socket.emit('logout', this.$store.state.user.username)
      this.$router.push('/')
    }
  },
  sockets: {
    updateUserList (list) {
      console.log(list)
      this.list = list
    },
    updateRoomName (data) {
      this.roomName = data
    },
    userTyping (data) {
      this.typing = data
    },
    done () {
      this.typing = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
