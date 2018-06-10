<template>
  <v-container style="position: relative; height: 100%; padding-bottom: 0;">
    
    <ol id="chatRoom" style="margin-bottom: 15vh;">
      <li v-for="m in messageSet" v-bind:message="m" :key="m.key" :class="m.textClass">
        <b v-if="m.textClass === 'user'">{{ m.from }}: </b> {{ m.text }}
        <p v-if="m.textClass === 'user'" style="color: lightgrey">{{ m.createdAt }}</p>
      </li>
    </ol>

    <v-form style="width:100%; position: absolute; bottom:0; left:0; background-color:#fafafa;" method="post" @submit.prevent="sendMessage">
      <v-text-field
        v-model="message"
        placeholder='ENTER YOUR MESSAGE'
        append-icon="send"
        style="width: 100%;"
        @blur="doneTyping"
        :append-icon-cb="sendMessage"
        prepend-icon="mood"
        :prepend-icon-cb="() => displayEmoji = !displayEmoji"
      ></v-text-field>
      <picker
        v-if="displayEmoji"
        @select="insertSymbol"
        title="Pick your emoji…"
        emoji="point_up"
        id="picker"
        :native="false"
        set="apple"
        style="width:100%; height: 30vh;"
        :showPreview="false"
      />
    </v-form>
  </v-container>
</template>

<script>
import { Picker } from 'emoji-mart-vue'

export default {
  name: 'room',
  data () {
    return {
      room: null,
      message: '',
      displayEmoji: false,
      messageSet: []
    }
  },
  components: {
    Picker
  },
  beforeMount () {
    this.room = this.$route.params.name
    const user = this.$store.state.user
    this.$store.commit('CURRENT_ROOM', this.room)
    this.$socket.emit('join', {room: this.room, name: user.name, username: user.username}, function (err) {
      if (err) {
        this.$router.push('/')
      }
    })
    this.$socket.emit('newRoom', this.room)
  },
  methods: {
    insertSymbol (emoji) {
      this.message += emoji.native
    },
    autoScroll () {
      const node = document.getElementById('chatRoom')
      const newMessage = node.lastChild
      const clientHeight = node.clientHeight
      const scrollTop = node.scrollTop
      const scrollHeight = node.scrollHeight
      let newMessageHeight, lastMessageHeight
      if (newMessage) {
        newMessageHeight = newMessage.clientHeight
        if (newMessage.previousSibling) {
          lastMessageHeight = newMessage.previousSibling.clientHeight
          if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            window.scrollTo(0, scrollHeight)
          }
        }
      }
    },
    sendMessage () {
      if (this.message) {
        this.$socket.emit('createMessage', {
          from: this.$store.state.user.name,
          text: this.message,
          room: this.room
        })
        this.message = ''
      }
    },
    doneTyping () {
      this.$socket.emit('doneTyping', {
        room: this.room
      })
    }
  },
  sockets: {
    newMessage (data) {
      this.messageSet.push(data)
      setTimeout(() => {
        this.autoScroll()
      }, 300)
    }
  },
  watch: {
    message (newV, old) {
      if (old.length < newV.length) {
        this.$socket.emit('typing', {
          from: this.$store.state.user.name,
          room: this.room
        })
      } else {
        this.$socket.emit('doneTyping', {
          room: this.room
        })
      }
    },
    displayEmoji (newval, old) {
      if (newval) {
        document.getElementById('chatRoom').style.marginBottom = '45vh'
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 500)
      } else {
        document.getElementById('chatRoom').style.marginBottom = '15vh'
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

ol {
  list-style-type: none;
  padding: 0;
}

.admin{
  text-align: center;
  width: 100%;
  font-size: 2.3vh;
  color: black;
  font-family: 'Roboto';
  font-weight: bold;
}
.input-group__details{
  min-height: 0;
}
li {
  margin: 10px 10px;
}

a {
  color: #35495E;
}
</style>
