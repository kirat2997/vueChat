<template>
  <div style="text-align:center;">
    <h1>WELCOME TO VUE CHAT</h1>
    <p>Select a room.</p>
  </div>
</template>

<script>
export default {
  name: 'intro',
  data () {
    return {
      drawer: true
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
  display: inline-block;
  margin: 0 10px;
}

template{
  text-align: center;
}

a {
  color: #35495E;
}
</style>
