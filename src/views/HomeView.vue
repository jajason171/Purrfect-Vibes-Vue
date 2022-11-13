<template>
  <head>
    <link
      rel="icon"
      href="../assets/logo.svg"
      type="image/x-icon"
    />
  </head>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      @click="checlang()"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
  <p @click="changelang()">{{ $t("message") }}</p>
  <!-- <p>{{ i18n.locale }}</p> -->
</template>

<script>
import i18n from "../i18n"
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "HomeView",
  components: {
    HelloWorld
  },
  setup() {
    const changelang = () => {
      i18n.global.locale.value = "en"
    }
    const checlang = () => {}

    return {
      changelang,
      checlang
    }
  }
}
</script>
