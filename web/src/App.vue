<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  display: -webkit-flex;
  display: flex;
}

html {
  position: relative;
  min-height: 100%;
}

body {
  margin: 0;
}

img {
  border: 0; /* Remove IE img link border */
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

input,
textarea {
  border-radius: 0;
  -webkit-border-radius: 0;
  -webkit-appearance: none;
}

h2.top {
  margin-top: 0px;
}

.spacer {
  overflow: hidden;
  height: 0px;
  width: 0px;
}

.fancytxt {
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
}

.fancytxt:hover {
  color: rgb(91, 183, 91);
  cursor: pointer;
}

.no-decoration {
  text-decoration: none !important;
}

.no-outline {
  outline: none !important;
}

.li-filled {
  list-style-type: disc;
}

.timestamp {
  font-style: italic;
  font-size: 0.75em;
  color: #A9A9A9;
}
</style>
