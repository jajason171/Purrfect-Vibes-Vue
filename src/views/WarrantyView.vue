<template>
  <section v-if="isLoading">
    <p>isloading</p>
  </section>
  <section
    class="h-[100vh]"
    :class="
      (formstatus === 'register' && 'h-[100vh]') ||
      (formstatus === 'complete' && 'h-[100vh]')
    "
    v-else
  >
    <div class="flex flex-col w-full bg-gray he-f">
      <div class="max-w-[700px] h-full">
        <div
          v-auto-animate
          class="p-5 h30"
          :class="
            (formstatus === 'register' && 'h-[70%]') ||
            (formstatus === 'complete' && 'h-[70%]')
          "
        >
          <div class="text-left flex justify-between z-[5]">
            <div class="">
              <h1>{{ $t("title") }}</h1>
              <p>{{ $t("Register to make it yours") }}</p>
            </div>
            <img
              @click.prevent="changelang()"
              alt="placeloder"
              src="../assets/dots.svg"
            />
          </div>
          <div class="absolute w-full h-[75vh] top-0 left-0 z-[-1]">
            <img
              alt="placeloder"
              src="../assets/1.png"
              class="w-full h-full"
            />
          </div>
        </div>
        <div
          v-auto-animate
          id="registerbtn"
          class="bg-blue-200 text-left rounded-t-[30px] flex flex-col justify-center z-5"
          :class="formstatus === 'register' && 'h30'"
        >
          <div class="p-5">
            <h1>Amy Bracelet</h1>
            <h2>{{ $t("Purchase on") }}: 01 Oct 2022</h2>
            <p v-if="formstatus === 'register'">
              {{ $t("warranty") }}
            </p>
          </div>
          <div
            v-auto-animate
            v-if="formstatus !== 'register'"
            class="flex justify-center"
          >
            <div class="bg-white p-5 w-full text-black rounded-t-[30px]">
              <h1 v-if="formstatus === 'confirm'">{{ $t("Confirm") }}</h1>
              <h1
                class="pb-2"
                v-else
              >
                {{ $t("Register") }}
              </h1>
              <h2 v-if="formstatus !== 'complete'">{{ $t("owner") }}</h2>
              <form
                class="flex flex-col"
                @submit.prevent="submitForm(FName, LName, Email, PhoneNum)"
              >
                <div
                  class="flex flex-col"
                  v-if="formstatus !== 'complete'"
                >
                  <label for="fname">{{ $t("First Name") }}:</label>
                  <p v-if="formstatus === 'confirm'">{{ FName }}</p>
                  <input
                    maxlength="25"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put FName' && ' bg-red-400 border-red-500 '
                    "
                    type="text"
                    v-model="FName"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">{{ $t("Last Name") }}:</label>
                  <p v-if="formstatus === 'confirm'">{{ LName }}</p>
                  <input
                    maxlength="25"
                    type="text"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put LName' && ' bg-red-400 border-red-500 '
                    "
                    v-model="LName"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">{{ $t("Phone no") }}:</label>
                  <p v-if="formstatus === 'confirm'">{{ PhoneNum }}</p>
                  <input
                    maxlength="10"
                    type="tel"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put LName' && ' bg-red-400 border-red-500 '
                    "
                    v-model="PhoneNum"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">{{ $t("Email") }}:</label>
                  <p v-if="formstatus === 'confirm'">{{ Email }}</p>
                  <input
                    maxlength="50"
                    type="email"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put LName' && ' bg-red-400 border-red-500 '
                    "
                    v-model="Email"
                    v-if="formstatus === 'form'"
                    required
                  />
                </div>
                <div
                  v-auto-animate
                  class="flex flex-col"
                >
                  <div class="flex flex-col">
                    <h1>{{ $t("Product Info") }}</h1>
                    <div class="flex w-full justify-between">
                      <div class="w50">
                        <p>{{ $t("Serial Number") }}</p>
                        <p>{{ $route.params.serialnumber }}</p>
                      </div>
                      <div class="w50">
                        <p>{{ $t("Price") }}</p>
                        <p>฿1490.00</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <h1>{{ $t("Warranty Info") }}</h1>
                    <div class="flex info">
                      <div class="w50">
                        <p>{{ $t("Warranty Start") }}</p>
                        <p>08-Oct-2022</p>
                      </div>
                      <div class="w50">
                        <p>{{ $t("Duration") }}</p>
                        <p>1 {{ $t("Year") }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <p
                      v-if="errormsg != ''"
                      class="text-red-500"
                    >
                      {{ errormsg }}
                    </p>
                  </div>
                </div>
                <div class="flex justify-around">
                  <button
                    v-if="formstatus === 'confirm'"
                    @click.prevent="setFormStatus('form')"
                    class="rounded bg-red-700 p-3 max-w-[200px] mt-5"
                  >
                    {{ $t("Back") }}
                  </button>
                  <input
                    required
                    v-if="formstatus === 'confirm'"
                    type="submit"
                    value="confirm"
                    class="rounded bg-red-700 p-3 max-w-[200px] mt-5"
                  />

                  <button
                    v-if="formstatus === 'form'"
                    @click.prevent="CheckInputError()"
                    class="rounded-xl bg-gray-400 px-3 py-1 max-w-[200px] mt-5 text-white borderregister"
                  >
                    {{ $t("Register") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            v-if="formstatus === 'register'"
            class="flex justify-center"
          >
            <button
              @click.prevent="setFormStatus('form'), scrollToEnd()"
              class="rounded bg-red-700 p-3 max-w-[200px] mt-5"
            >
              {{ $t("Register Bracelet") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity"
import { useRouter } from "vue-router"
import i18n from "../i18n"
// import { computed } from "vue"
import axios from "axios"
// eslint-disable-next-line
import { onMounted } from "@vue/runtime-core"
export default {
  setup() {
    const router = useRouter()
    let isLoading = ref(true)
    let FName = ref("jason")
    let LName = ref("jan")
    let Email = ref("jasonefw@gmail.com")
    let PhoneNum = ref("0865412579")
    const firsttext = ref("hello")
    let secnum = ref(0)
    let formstatus = ref("register")
    let errormsg = ref("")
    const increst = () => {
      console.log(router.currentRoute.value.params.serialnumber)
    }
    let lang = ref("en")
    const changelang = () => {
      if (lang === "en") {
        lang = "th"
      } else {
        lang = "en"
      }
      i18n.locale = lang
      console.log(router.currentRoute.value.params.lang)
    }
    const setFormStatus = (value) => {
      formstatus.value = value
      console.log(formstatus.value)
    }

    const scrollToEnd = () => {
      const element = document.getElementById("registerbtn")
      setTimeout(
        () =>
          element.scrollIntoView({
            behavior: "smooth"
          }),
        100
      )
      // window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const submitForm = (firstName, lastName, email, phoneNo) => {
      axios
        .post("https://social-paws-travel-49-228-16-65.loca.lt/warranty", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNo: phoneNo,
          orderId: router.currentRoute.value.params.serialnumber,
          serialNumber: router.currentRoute.value.params.serialnumber
        })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            setFormStatus("complete")
          }
        })
        .catch((error) => {
          this.response = "Error: " + error.response
        })
    }

    const CheckInputError = () => {
      if (
        FName.value === "" ||
        LName.value === "" ||
        Email.value === "" ||
        PhoneNum.value === ""
      ) {
        if (FName.value === "") {
          errormsg.value = "put FName"
        } else if (LName.value === "") {
          errormsg.value = "put LName"
        } else if (Email.value === "") {
          errormsg.value = "put Email"
        } else if (PhoneNum.value === "") {
          errormsg.value = "put PhoneNum"
        }
      } else if (
        PhoneNum.value.length != 10 ||
        PhoneNum.value.includes("@", 0) === "0"
      ) {
        errormsg.value = "PhoneNum is in a wrong format"
      } else if (!Email.value.includes("@") || !Email.value.includes(".")) {
        errormsg.value = "Email is in a wrong format"
      } else {
        setFormStatus("confirm")
        errormsg.value = ""
      }
    }
    // eslint-disable-next-line
    const getItemInfo = () => {
      axios
        .get(
          `https://social-paws-travel-49-228-16-65.loca.lt/warranty/${router.currentRoute.value.params.serialnumber}`
        )
        .then((response) => {
          isLoading.value = false
          console.log(response)
          if (response === []) {
            setFormStatus("register")
          } else {
            setFormStatus("complete")
          }
        })
        .catch((error) => {
          isLoading.value = false
          this.response = "Error: " + error.response
        })
    }
    // onMounted(getItemInfo())
    return {
      scrollToEnd,
      firsttext,
      secnum,
      increst,
      formstatus,
      setFormStatus,
      submitForm,
      CheckInputError,
      errormsg,
      FName,
      LName,
      Email,
      PhoneNum,
      changelang
    }
  }
}
</script>

<style scope>
h1 {
  font-size: 18px !important;
  font-weight: 700 !important;
}
.info {
  width: 100%;
}
.w50 {
  width: 50%;
}
.inputform {
  background: #cfcfcf;
}
.h70 {
  height: 60% !important;
}
.h30 {
  height: 30%;
}
.he-f {
  height: 100%;
}
.borderregister {
  border: 3px solid #ffffff;
  border-radius: 15px;
}
</style>
