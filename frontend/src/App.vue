<template>
  <div id="app">
    <v-app>
      <v-app-bar color="primary" dense short dark app>
        <v-toolbar-title class="app__title">🎅{{ $appName }}</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>

      <v-footer padless>
        <v-col class="text-center" cols="12">
          <v-spacer></v-spacer>
          {{ new Date().getFullYear() }} — <strong>Alexandre Erard</strong>
          <v-spacer></v-spacer>
          <v-icon>mdi-github</v-icon>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
export default {
  components: {},
  data: () => ({
    collapseOnScroll: false,
  }),
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app__title {
  font-size: 24pt !important;
  font-weight: 800;
}
</style>
