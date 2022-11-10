<template>
  <section v-if="isLoading === true && is404 === true">
    <p v-if="isLoading === true">isloading</p>
    <p v-if="is404 === true">isError</p>
  </section>
  <section
    class="h-[100vh]"
    :class="
      (formstatus === 'register' && 'h-[100vh]') ||
      (formstatus === 'complete' && 'h-[100vh]')
    "
    v-else
  >
    <div
      v-if="modal === true"
      class="rounded-[30px] max-w-[500px] w-[80%] top-[25%] left-[10%] h-[429px] absolute z-10 bg-white p-6 modaldiv"
    >
      <div class="w-[80%] h-[50%] mx-5">
        <img src="../assets/success.gif" />
      </div>
      <h1 class="text-black my-2">{{ $t("Successful") }}</h1>
      <p class="mb-2">
        {{ $t("Contact") }}
      </p>
      <div class="flex justify-around">
        <button
          @click.prevent="setModal(false), setFormStatus('complete')"
          class="px-3 py-2 w-[40%] mt-5 borderback"
        >
          {{ $t("Back") }}
        </button>
        <button
          class="rounded-xl bg-[#2CDA94] px-3 py-2w-[40%] mt-5 text-white borderregister"
        >
          <a
            href="https://liff.line.me/1645278921-kWRPP32q/?accountId=purrfect.vibes"
            target="_blank"
          >
            Line OA
          </a>
        </button>
      </div>
    </div>
    <div
      class="flex flex-col w-full bg-gray he-f justify-center"
      :class="modal === true && 'blur'"
    >
      <div class="w-full max-w-[600px] h-full content m-auto">
        <div
          v-auto-animate
          class="p-5 h30"
          :class="
            (formstatus === 'register' && 'h-[73%]') ||
            (formstatus === 'complete' && 'h-[60%]')
          "
        >
          <div class="text-left flex justify-between z-[5] mt-[15%]">
            <div
              class=""
              v-if="formstatus === 'complete'"
            >
              <h1>{{ $t("Warranty Left") }}</h1>
              <p>{{ duration }} {{ $t("Days") }}</p>
            </div>
            <div
              class=""
              v-else
            >
              <h1 @click.prevent="increst()">{{ $t("title") }}</h1>
              <p>{{ $t("Register to make it yours") }}</p>
            </div>

            <h3
              @click.prevent="changelang()"
              v-if="lang === 'en'"
              class="dots"
            >
              TH
            </h3>
            <h3
              @click.prevent="changelang()"
              v-else
              class="dots mt-[1px]"
            >
              EN
            </h3>
          </div>
          <div class="absolute w-full h-[80vh] top-0 left-0 z-[-1]">
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
          class="bg-[#1b1b1b] text-left rounded-t-[30px] flex flex-col justify-center z-5"
          :class="formstatus === 'register' && 'h25'"
        >
          <div class="px-6 text-white">
            <h1 class="my-2">Amy Bracelet</h1>
            <h2 class="mb-2">{{ $t("Purchase on") }}: {{ startDate }}</h2>
            <p
              class="wanp"
              v-if="formstatus === 'register'"
            >
              {{ $t("warranty1") }}
            </p>
            <p
              class="wanp"
              v-if="formstatus === 'register'"
            >
              {{ $t("warranty2") }}
            </p>
          </div>
          <div
            v-auto-animate
            v-if="formstatus !== 'register'"
            class="flex justify-center"
          >
            <div class="bg-white p-7 w-full text-black rounded-t-[30px]">
              <h1
                class="mb-3"
                v-if="formstatus === 'confirm'"
              >
                {{ $t("Confirm") }}
              </h1>
              <h1
                class="mb-3"
                v-else
                :class="formstatus === 'complete' && 'hidden'"
              >
                {{ $t("Register") }}
              </h1>
              <h1
                class="mb-2"
                v-if="formstatus !== 'complete'"
              >
                {{ $t("owner") }}
              </h1>
              <form
                class="flex flex-col"
                @submit.prevent="submitForm(FName, LName, Email, PhoneNum)"
              >
                <div
                  class="flex flex-col"
                  v-if="formstatus !== 'complete'"
                >
                  <label for="fname">{{ $t("First Name") }}:</label>
                  <p
                    class="confirmtext"
                    v-if="formstatus === 'confirm'"
                  >
                    {{ FName }}
                  </p>
                  <input
                    maxlength="25"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'Please insert FirstName.' &&
                      ' bg-red-400 border-red-500 '
                    "
                    type="text"
                    v-model="FName"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">{{ $t("Last Name") }}:</label>
                  <p
                    class="confirmtext"
                    v-if="formstatus === 'confirm'"
                  >
                    {{ LName }}
                  </p>
                  <input
                    maxlength="25"
                    type="text"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'Please insert LastName.' &&
                      ' bg-red-400 border-red-500 '
                    "
                    v-model="LName"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">{{ $t("Phone no") }}:</label>
                  <p
                    class="confirmtext"
                    v-if="formstatus === 'confirm'"
                  >
                    {{ PhoneNum }}
                  </p>
                  <input
                    maxlength="10"
                    type="tel"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'PhoneNumber is in a wrong format.' &&
                      ' bg-red-400 border-red-500 '
                    "
                    v-model="PhoneNum"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">{{ $t("Email") }}:</label>
                  <p
                    class="confirmtext"
                    v-if="formstatus === 'confirm'"
                  >
                    {{ Email }}
                  </p>
                  <input
                    maxlength="50"
                    type="email"
                    class="bg-gray-200 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'Email is in a wrong format.' &&
                      ' bg-red-400 border-red-500 '
                    "
                    v-model="Email"
                    v-if="formstatus === 'form'"
                    required
                  />
                </div>
                <div
                  v-auto-animate
                  class="flex flex-col mt-5"
                >
                  <div class="flex flex-col mb-3">
                    <h1 class="mb-2">{{ $t("Product Info") }}</h1>
                    <div class="flex w-full justify-between mb-2">
                      <div class="w50">
                        <p>{{ $t("Serial Number") }}</p>
                        <p class="productinfo">
                          {{ $route.params.serialnumber }}
                        </p>
                      </div>
                      <div class="w50">
                        <p>{{ $t("Price") }}</p>
                        <p class="productinfo">฿ 1,790.00</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <h1 class="mb-2">{{ $t("Warranty Info") }}</h1>
                    <div class="flex info">
                      <div class="w50">
                        <p>{{ $t("Warranty Start") }}</p>
                        <p class="productinfo">{{ warrantyDate }}</p>
                      </div>
                      <div class="w50">
                        <p>{{ $t("Duration") }}</p>
                        <p class="productinfo">1 {{ $t("Year") }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <p
                      v-if="errormsg === 'Please insert FirstName.'"
                      class="text-red-500"
                    >
                      {{ $t("FirstNameer") }}
                    </p>
                    <p
                      v-if="errormsg === 'Please insert LastName.'"
                      class="text-red-500"
                    >
                      {{ $t("LastNameer") }}
                    </p>
                    <p
                      v-if="errormsg === 'PhoneNumber is in a wrong format.'"
                      class="text-red-500"
                    >
                      {{ $t("PhoneNumberer") }}
                    </p>
                    <p
                      v-if="errormsg === 'Email is in a wrong format.'"
                      class="text-red-500"
                    >
                      {{ $t("Emailer") }}
                    </p>
                  </div>
                </div>
                <div class="flex justify-around">
                  <button
                    v-if="formstatus === 'confirm'"
                    @click.prevent="setFormStatus('form')"
                    class="px-3 py-[7px] max-w-[200px] min-w-[120px] mt-5 borderback"
                  >
                    {{ $t("Back") }}
                  </button>
                  <input
                    required
                    v-if="formstatus === 'confirm'"
                    type="submit"
                    value="Confirm"
                    class="rounded-xl bg-[#1b1b1b] px-3 py-[7px] max-w-[200px] min-w-[120px] mt-5 text-white borderregister"
                  />

                  <button
                    v-if="formstatus === 'form'"
                    @click.prevent="CheckInputError()"
                    class="bg-gray-400 px-4 py-1 max-w-[200px] mt-5 text-white borderregister"
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
              class="rounded-[12px] bg-gray-400 py-2 px-4 max-w-[250px] mt-5 regisbtn text-white"
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
import moment from "moment"
// import { computed } from "vue"
import axios from "axios"
export default {
  setup() {
    const router = useRouter()
    let isLoading = ref(true)
    let is404 = ref(false)
    let FName = ref("jason")
    let LName = ref("jan")
    let Email = ref("jasonefw@gmail.com")
    let PhoneNum = ref("0865412579")
    const firsttext = ref("hello")
    let secnum = ref(0)
    let formstatus = ref("register")
    let errormsg = ref("")
    let startDate = ref("")
    let warrantyDate = ref("")
    let duration = ref("")
    let error404 = ref(false)
    let modal = ref(false)
    const increst = () => {
      console.log(router.currentRoute.value.params.serialnumber)
    }
    let lang = ref("th")
    const changelang = () => {
      if (lang.value === "en") {
        lang.value = "th"
      } else {
        lang.value = "en"
      }
      i18n.global.locale.value = lang.value
      console.log(i18n.global.locale.value)
    }
    const setFormStatus = (_value) => {
      formstatus.value = _value
    }
    const setModal = (_value) => {
      modal.value = _value
      getItemInfo()
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
        .post(`${process.env.VUE_APP_BE_WEB}/warranty/register`, {
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
            setInterval(getItemInfo(), 1500)
            modal.value = true
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
          errormsg.value = "Please insert FirstName."
        } else if (LName.value === "") {
          errormsg.value = "Please insert LastName."
        } else if (Email.value === "") {
          errormsg.value = "PhoneNumber is in a wrong format."
        } else if (PhoneNum.value === "") {
          errormsg.value = "Email is in a wrong format."
        }
      } else if (
        PhoneNum.value.length != 10 ||
        PhoneNum.value.includes("@", 0) === "0"
      ) {
        errormsg.value = "PhoneNumber is in a wrong format."
      } else if (!Email.value.includes("@") || !Email.value.includes(".")) {
        errormsg.value = "Email is in a wrong format."
      } else {
        errormsg.value = ""
        setFormStatus("confirm")
      }
    }

    // eslint-disable-next-line
    const getItemInfo = () => {
      axios
        .get(
          `${process.env.VUE_APP_BE_WEB}/warranty/${router.currentRoute.value.params.serialnumber}`
        )
        .then((response) => {
          console.log(response)
          console.log(response.data)
          console.log(response.data === "Invalid serial number")

          if (response.data === "Invalid serial number") {
            is404.value = true
            console.log(is404.value)
          }
          if (response.data.duration < 0) {
            setFormStatus("register")
            startDate.value = moment(response.data.startDate).format(
              "DD MMM YYYY"
            )
            warrantyDate.value = moment(startDate.value)
              .add(7, "days")
              .format("DD-MMM-YYYY")
          } else {
            setFormStatus("complete")
            startDate.value = moment(response.data.startDate).format(
              "DD MMM YYYY"
            )
            warrantyDate.value = moment(startDate.value)
              .add(7, "days")
              .format("DD-MMM-YYYY")
            duration.value = response.data.duration
          }
        })
        .catch((error) => {
          is404.value = false
          this.response = "Error: " + error.response
        })
      isLoading.value = false
    }

    getItemInfo()
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
      changelang,
      getItemInfo,
      isLoading,
      lang,
      warrantyDate,
      startDate,
      duration,
      error404,
      modal,
      setModal
    }
  }
}
</script>

<style scope>
h1 {
  font-size: 20px !important;
  font-weight: 700 !important;
}
h2 {
  font-size: 18 px !important;
  font-weight: 400 !important;
  color: #d9d9d9;
}
h3 {
  font-size: 18px !important;
  font-weight: 400 !important;
}
label {
  font-size: 17x !important;
  font-weight: 400 !important;
}
.productinfo {
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #525252 !important;
}
.confirmtext {
  font-size: 18px !important;
  font-weight: 600 !important;
}
.info {
  width: 100%;
}
.w50 {
  width: 50%;
}
.inputform {
  background: #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
}
.h70 {
  height: 60% !important;
}
.h30 {
  height: 30%;
}
.h25 {
  height: 27%;
}
.he-f {
  height: 100%;
}
.borderregister {
  border: 3px solid #d9d9d9;
  border-radius: 15px;
  color: #ffffff;
  font-size: 16px !important;
  font-weight: 600 !important;
}
.regisbtn {
  /* border: 1px solid #ffffff; */
  border-radius: 15px;
  font-size: 18px !important;
  font-weight: 600 !important;
}
.borderback {
  border-radius: 15px;
  background: #d9d9d9;
  color: #a4a4a4;
  font-size: 16px !important;
  font-weight: 600 !important;
}
.dots {
  cursor: pointer;
}
.wanp {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #a4a4a4;
}
.modaldiv {
}
.blur {
  filter: blur(5px);
}
</style>
