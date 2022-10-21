<template>
  <section v-if="isLoading">
    <p>isloading</p>
  </section>
  <section
    :class="formstatus === 'register' && 'h-[100vh]'"
    v-else
  >
    <div class="flex flex-col w-full bg-gray he-f">
      <div class="max-w-[700px] mx-auto h-full">
        <p class="text-black">{{ formstatus }}</p>
        <div
          v-auto-animate
          class="p-5 h30 bg-yellow-400"
          :class="(formstatus === 'register' || 'complete') && 'h-[70%]'"
        >
          <div class="text-left flex justify-between">
            <div class="">
              <p>Bracelet not registered</p>
              <p>Register to make it yours</p>
            </div>
            <img
              @click.prevent="increst()"
              alt="placeloder"
              src="../assets/dots.svg"
            />
          </div>
          <div
            v-auto-animate
            class="flex flex-col justify-center align-middle pt-5 h-full"
          >
            <img
              v-if="formstatus === 'register' || 'complete'"
              alt="placeloder"
              src="../assets/pink-l.png"
              class="max-h-[80%]"
            />
            <img
              v-else
              alt="placeloder"
              src="../assets/blue.png"
            />
          </div>
        </div>
        <div
          id="registerbtn"
          class="bg-blue-200 text-left rounded-t-[30px] flex flex-col justify-center"
          :class="formstatus === 'register' && 'h30'"
        >
          <div class="p-5">
            <p>Amy Bracelet</p>
            <p>Purchase on: 01 Oct 2022</p>
            <p v-if="formstatus === 'register'">
              *warranty automatically starts 7 days after your purchase
            </p>
          </div>
          <div
            v-if="formstatus !== 'register'"
            class="flex justify-center"
          >
            <div class="bg-white p-5 w-full text-black rounded-t-[30px]">
              <h1 v-if="formstatus === 'confirm'">Confirm Register Info</h1>
              <h1
                class="pb-2"
                v-else
              >
                Register
              </h1>
              <h2 v-if="formstatus !== 'complete'">owner</h2>
              <form
                class="flex flex-col"
                @submit.prevent="submitForm(FName, LName, Email, PhoneNum)"
              >
                <div
                  class="flex flex-col"
                  v-if="formstatus !== 'complete'"
                >
                  <label for="fname">First Name:</label>
                  <p v-if="formstatus === 'confirm'">{{ FName }}</p>
                  <input
                    maxlength="25"
                    class="bg-gray-400 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put FName' && ' bg-red-400 border-red-500 '
                    "
                    type="text"
                    v-model="FName"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">Last Name:</label>
                  <p v-if="formstatus === 'confirm'">{{ LName }}</p>
                  <input
                    maxlength="25"
                    type="text"
                    class="bg-gray-400 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put LName' && ' bg-red-400 border-red-500 '
                    "
                    v-model="LName"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">Phone no:</label>
                  <p v-if="formstatus === 'confirm'">{{ PhoneNum }}</p>
                  <input
                    maxlength="10"
                    type="tel"
                    class="bg-gray-400 rounded-lg inputform my-2 py-1"
                    :class="
                      errormsg === 'put LName' && ' bg-red-400 border-red-500 '
                    "
                    v-model="PhoneNum"
                    v-if="formstatus === 'form'"
                    required
                  />
                  <label for="fname">Email:</label>
                  <p v-if="formstatus === 'confirm'">{{ Email }}</p>
                  <input
                    maxlength="50"
                    type="email"
                    class="bg-gray-400 rounded-lg inputform my-2 py-1"
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
                    <h1>Product Info</h1>
                    <div class="flex w-full justify-between">
                      <div class="w50">
                        <p>Serial Number</p>
                        <p>{{ $route.params.serialnumber }}</p>
                      </div>
                      <div class="w50">
                        <p>Price</p>
                        <p>฿1490.00</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <h1>Warranty Info</h1>
                    <div class="flex info">
                      <div class="w50">
                        <p>Warranty Start</p>
                        <p>08-Oct-2022</p>
                      </div>
                      <div class="w50">
                        <p>Duration</p>
                        <p>1 Year</p>
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
                    Back
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
                    class="rounded bg-green-700 p-3 max-w-[200px] mt-5"
                  >
                    Register
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
              Register Bracelet
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
      PhoneNum
    }
  }
}
</script>

<style scope>
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
</style>
