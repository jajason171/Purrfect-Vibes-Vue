<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
  <p @click="changelang()">{{ $t("message") }}</p>
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
      i18n.locale = "en"
      console.log(i18n.global.locale.value)
    }
    return {
      changelang
    }
  }
}
</script>
